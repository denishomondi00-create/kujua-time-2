'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateAutomationMutation, useUpdateAutomationMutation } from '@/features/automations/mutations'
import { AUTOMATION_ACTION_OPTIONS, AUTOMATION_TRIGGER_OPTIONS, getAutomationStatusTone } from '@/features/automations/utils'
import { automationCreateSchema, type Automation, type AutomationCreateInput, type AutomationLog, type AutomationTemplate } from '@/features/automations/schemas'

function EnabledBadge({ enabled }: { enabled: boolean }) {
  const tone = getAutomationStatusTone(enabled)

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, background: tone.background, color: tone.color }}>
      {enabled ? 'Enabled' : 'Disabled'}
    </span>
  )
}

export function AutomationList({ items }: { items: Automation[] }) {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      {items.map((automation) => (
        <article key={automation.id} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 12 }}>
            <div>
              <h3 style={{ marginBottom: 8 }}>{automation.name}</h3>
              <p style={{ margin: 0 }}>Trigger: {automation.triggerEvent}</p>
            </div>
            <EnabledBadge enabled={automation.enabled} />
          </div>
          <div style={{ fontSize: '0.9375rem', color: 'var(--kujua-gray-700)' }}>
            {automation.actions.length} action{automation.actions.length === 1 ? '' : 's'}
          </div>
        </article>
      ))}
    </div>
  )
}

export function AutomationEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>No automations yet</h3>
      <p style={{ marginBottom: 20 }}>
        Start with templates for booking confirmations, reminders, payment receipts, and follow-up prompts.
      </p>
    </section>
  )
}

export function AutomationTemplateGallery({ templates }: { templates: AutomationTemplate[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
      {templates.map((template) => (
        <article key={template.id} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20 }}>
          <p className="kujua-eyebrow" style={{ marginBottom: 10 }}>{template.triggerEvent}</p>
          <h3 style={{ marginBottom: 10 }}>{template.name}</h3>
          <p style={{ marginBottom: 14 }}>{template.description}</p>
          <div style={{ color: 'var(--kujua-gray-700)' }}>{template.actions.length} action{template.actions.length === 1 ? '' : 's'}</div>
        </article>
      ))}
    </div>
  )
}

export function AutomationLogTable({ logs }: { logs: AutomationLog[] }) {
  return (
    <div style={{ overflowX: 'auto', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
        <thead>
          <tr style={{ background: 'var(--kujua-gray-50)' }}>
            {['Execution', 'Status', 'Started', 'Completed', 'Error'].map((column) => (
              <th key={column} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)' }}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} style={{ borderTop: '1px solid var(--kujua-gray-100)' }}>
              <td style={{ padding: '16px 18px' }}>{log.id}</td>
              <td style={{ padding: '16px 18px' }}>{log.status}</td>
              <td style={{ padding: '16px 18px' }}>{log.startedAt ? new Date(log.startedAt).toLocaleString() : '—'}</td>
              <td style={{ padding: '16px 18px' }}>{log.completedAt ? new Date(log.completedAt).toLocaleString() : '—'}</td>
              <td style={{ padding: '16px 18px' }}>{log.errorMessage ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type AutomationEditorFormProps = {
  mode: 'create' | 'update'
  initialValues?: Partial<AutomationCreateInput>
  automationId?: string
  onSuccess?(automationId: string): void
}

export function AutomationEditorForm({ mode, initialValues, automationId, onSuccess }: AutomationEditorFormProps) {
  const createMutation = useCreateAutomationMutation()
  const updateMutation = useUpdateAutomationMutation(automationId ?? '')
  const mutation = mode === 'create' ? createMutation : updateMutation

  const form = useForm<AutomationCreateInput>({
    resolver: zodResolver(automationCreateSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      enabled: initialValues?.enabled ?? true,
      triggerEvent: initialValues?.triggerEvent ?? 'booking.created',
      actions: initialValues?.actions ?? [{ type: 'send_email', label: 'Send email', config: {} }],
    },
  })

  const actions = form.watch('actions')

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = mode === 'create'
      ? await createMutation.mutateAsync(values)
      : await updateMutation.mutateAsync(values)

    onSuccess?.(result.id)
  })

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Automation name</label>
        <input className="kujua-input" {...form.register('name')} />
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Trigger</label>
          <select className="kujua-input" {...form.register('triggerEvent')}>
            {AUTOMATION_TRIGGER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'end' }}>
          <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
            <input type="checkbox" {...form.register('enabled')} />
            Enabled
          </label>
        </div>
      </div>

      <section style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 18, padding: 18 }}>
        <h3 style={{ marginBottom: 14 }}>Actions</h3>
        <div style={{ display: 'grid', gap: 14 }}>
          {actions.map((action, index) => (
            <div key={`${action.type}-${index}`} style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 16, padding: 16 }}>
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Action type</label>
                  <select className="kujua-input" {...form.register(`actions.${index}.type`)}>
                    {AUTOMATION_ACTION_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Label</label>
                  <input className="kujua-input" {...form.register(`actions.${index}.label`)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button type="submit" className="btn-primary" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving…' : mode === 'create' ? 'Create automation' : 'Save automation'}
      </button>
    </form>
  )
}
