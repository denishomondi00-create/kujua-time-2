/**
 * Delivers outgoing user-configured webhooks.
 * Processor for: webhooks.deliver
 */
import crypto from 'crypto'
import { Worker, Job } from 'bullmq'
import type { ConnectionOptions } from 'bullmq'
import { WEBHOOKS_DELIVER_QUEUE_NAME, type WebhookDeliveryJobData } from '@kujua-time/queue'
import { createLogger } from '@kujua-time/observability'

const logger = createLogger('webhooks-deliver')

export function registerWebhooksDeliverProcessor(
  connection: ConnectionOptions,
  concurrency: number
): Worker[] {
  const worker = new Worker<WebhookDeliveryJobData>(
    WEBHOOKS_DELIVER_QUEUE_NAME,
    async (job: Job<WebhookDeliveryJobData>) => {
      const { workspaceId, url, method, headers, body, signingSecret, attempt } = job.data

      logger.info(`Delivering webhook to ${url}`, { workspaceId, attempt })

      const payload = JSON.stringify(body)
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'KujuaTime-Webhooks/1.0',
        'X-Webhook-Attempt': String(attempt),
        ...headers,
      }

      if (signingSecret) {
        const signature = crypto
          .createHmac('sha256', signingSecret)
          .update(payload)
          .digest('hex')
        requestHeaders['X-Webhook-Signature'] = `sha256=${signature}`
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10_000)

      try {
        const res = await fetch(url, {
          method: method ?? 'POST',
          headers: requestHeaders,
          body: payload,
          signal: controller.signal,
        })

        clearTimeout(timeout)

        try {
          const mongoose = (await import('mongoose')).default
          const OutgoingWebhook = mongoose.model('OutgoingWebhook')
          await OutgoingWebhook.create({
            workspaceId,
            url,
            method,
            attempt,
            responseStatus: res.status,
            responseBody: (await res.text()).substring(0, 2000),
            deliveredAt: new Date(),
            success: res.ok,
          })
        } catch (logErr: any) {
          logger.warn('Failed to log webhook delivery', { error: logErr.message })
        }

        if (!res.ok) {
          throw new Error(`Webhook returned ${res.status}`)
        }

        logger.info(`Webhook delivered to ${url}`, { status: res.status })
      } catch (err: any) {
        clearTimeout(timeout)
        logger.error(`Webhook delivery failed: ${url}`, { error: err.message, attempt })
        throw err
      }
    },
    {
      connection,
      concurrency,
    }
  )

  return [worker]
}