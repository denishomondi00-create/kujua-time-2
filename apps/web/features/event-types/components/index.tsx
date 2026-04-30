'use client'

import type { ChangeEvent } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, MapPin, MessageCircle, MonitorSmartphone, Phone, Video } from 'lucide-react'

import { useCreateEventTypeMutation, useUpdateEventTypeMutation } from '@/features/event-types/mutations'
import { MEETING_LOCATION_OPTIONS, formatEventTypePayment, getEventTypeStatusTone } from '@/features/event-types/utils'
import { eventTypeCreateSchema, type EventType, type EventTypeCreateInput, type EventTypePreview, type EventTypeStatus, type MeetingLocationType } from '@/features/event-types/schemas'
import type { EventTypeBuilderTab } from '@/features/event-types/hooks'

const LOCATION_ICONS: Record<MeetingLocationType, React.ReactNode> = {
  in_person: <MapPin size={16} />,
  zoom: <Video size={16} />,
  google_meet: <MonitorSmartphone size={16} />,
  phone: <Phone size={16} />,
  whatsapp: <MessageCircle size={16} />,
  custom: <Link2 size={16} />,
}

function StatusPill({ status }: { status: EventTypeStatus }) {
  const tone = getEventTypeStatusTone(status)

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, background: tone.background, color: tone.color }}>
      {status.toUpperCase()}
    </span>
  )
}

export function EventTypeCard({ eventType, workspaceSlug }: { eventType: EventType; workspaceSlug?: string }) {
  const publicBookingPath = workspaceSlug ? `/book/${workspaceSlug}/${eventType.slug}` : undefined

  return (
    <article style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20, boxShadow: 'var(--kujua-shadow-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 14 }}>
        <div>
          <h3 style={{ marginBottom: 8 }}>{eventType.name}</h3>
          <p style={{ margin: 0 }}>{eventType.description ?? 'No description provided yet.'}</p>
        </div>
        <StatusPill status={eventType.status} />
      </div>
      <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
        <div><strong>Duration:</strong> {eventType.durationMinutes} min</div>
        <div><strong>Payment:</strong> {formatEventTypePayment(eventType)}</div>
        <div><strong>Locations:</strong> {eventType.locations.join(', ')}</div>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href={`/app/event-types/${eventType.id}`} className="btn-secondary">Edit</Link>
        <Link href={`/app/event-types/${eventType.id}/preview`} className="btn-primary">Preview</Link>
        {publicBookingPath ? <Link href={publicBookingPath} className="btn-secondary">Booking page</Link> : null}
      </div>
    </article>
  )
}

export function EventTypesGrid({ items, workspaceSlug }: { items: EventType[]; workspaceSlug?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
      {items.map((item) => <EventTypeCard key={item.id} eventType={item} workspaceSlug={workspaceSlug} />)}
    </div>
  )
}

export function EventTypesEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>Create your first event type</h3>
      <p style={{ marginBottom: 20 }}>
        Event types define what clients can book, how long it takes, where it happens, and whether payment is required.
      </p>
      <Link href="/app/event-types/new" className="btn-primary">Create event type</Link>
    </section>
  )
}

export function EventTypeBuilderTabs({ activeTab, onChange }: { activeTab: EventTypeBuilderTab; onChange(value: EventTypeBuilderTab): void }) {
  const tabs: EventTypeBuilderTab[] = ['basics', 'availability', 'booking-rules', 'payment', 'forms', 'reminders', 'branding', 'sharing']

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {tabs.map((tab) => (
        <button key={tab} type="button" onClick={() => onChange(tab)} className={activeTab === tab ? 'btn-teal' : 'btn-secondary'} style={{ padding: '10px 16px' }}>
          {tab}
        </button>
      ))}
    </div>
  )
}

type EventTypeBuilderFormProps = {
  mode: 'create' | 'update'
  initialValues?: Partial<Omit<EventTypeCreateInput, 'color' | 'description'> & { color?: string | null; description?: string | null }>
  eventTypeId?: string
  onSuccess?(eventTypeId: string): void
}

function slugifyEventTypeName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function EventTypeBuilderForm({ mode, initialValues, eventTypeId, onSuccess }: EventTypeBuilderFormProps) {
  const createMutation = useCreateEventTypeMutation()
  const updateMutation = useUpdateEventTypeMutation(eventTypeId ?? '')
  const mutation = mode === 'create' ? createMutation : updateMutation

  const form = useForm<EventTypeCreateInput>({
    resolver: zodResolver(eventTypeCreateSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      slug: initialValues?.slug ?? '',
      description: initialValues?.description ?? '',
      durationMinutes: initialValues?.durationMinutes ?? 30,
      color: initialValues?.color ?? '',
      requiresApproval: initialValues?.requiresApproval ?? false,
      locations: initialValues?.locations ?? ['google_meet'],
      payment: initialValues?.payment ?? {
        required: false,
        mode: 'free',
        amount: null,
        currency: 'USD',
      },
    },
  })
  const nameRegistration = form.register('name')
  const slugRegistration = form.register('slug')

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = mode === 'create'
      ? await createMutation.mutateAsync(values)
      : await updateMutation.mutateAsync(values)

    onSuccess?.(result.id)
  })

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    nameRegistration.onChange(event)
    if (mode === 'create' && !form.getFieldState('slug').isDirty) {
      form.setValue('slug', slugifyEventTypeName(event.target.value), {
        shouldValidate: true,
        shouldDirty: false,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <div>
          <label htmlFor="event-name" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Event name</label>
          <input id="event-name" className="kujua-input" {...nameRegistration} onChange={handleNameChange} />
          {form.formState.errors.name ? <p style={{ color: 'var(--kujua-error)', margin: '6px 0 0 0' }}>{form.formState.errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="event-slug" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Slug</label>
          <input id="event-slug" className="kujua-input" {...slugRegistration} />
          {form.formState.errors.slug ? <p style={{ color: 'var(--kujua-error)', margin: '6px 0 0 0' }}>{form.formState.errors.slug.message}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="event-description" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Description</label>
        <textarea id="event-description" className="kujua-input" rows={4} {...form.register('description')} />
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <div>
          <label htmlFor="event-duration" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Duration (minutes)</label>
          <input id="event-duration" className="kujua-input" type="number" {...form.register('durationMinutes', { valueAsNumber: true })} />
        </div>
        <div>
          <label htmlFor="event-color" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Color</label>
          <input id="event-color" className="kujua-input" type="color" {...form.register('color')} />
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontSize: '0.9375rem' }}>
            <input type="checkbox" {...form.register('requiresApproval')} />
            Require manual approval
          </label>
        </div>
      </div>

      <fieldset style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 16, padding: 16 }}>
        <legend style={{ padding: '0 8px', fontWeight: 700, color: 'var(--kujua-charcoal)' }}>Meeting location</legend>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: 'var(--kujua-gray-500, #6b7280)' }}>
          Choose one place where you will meet your clients.
        </p>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          {MEETING_LOCATION_OPTIONS.map((option) => {
            const isSelected = form.watch('locations')?.[0] === option.value
            return (
              <label
                key={option.value}
                style={{
                  display: 'flex', gap: 8, alignItems: 'center', padding: '10px 14px',
                  borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
                  border: `2px solid ${isSelected ? 'var(--kujua-teal, #0d9488)' : 'var(--kujua-gray-200)'}`,
                  background: isSelected ? 'color-mix(in srgb, var(--kujua-teal, #0d9488) 8%, white)' : 'white',
                  color: isSelected ? 'var(--kujua-teal, #0d9488)' : 'var(--kujua-charcoal)',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <input
                  type="radio"
                  style={{ display: 'none' }}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => form.setValue('locations', [option.value], { shouldValidate: true })}
                />
                <span style={{ flexShrink: 0 }}>{LOCATION_ICONS[option.value]}</span>
                <span style={{ fontSize: '0.875rem' }}>{option.label}</span>
              </label>
            )
          })}
        </div>
        {form.formState.errors.locations ? (
          <p style={{ color: 'var(--kujua-error)', margin: '8px 0 0 0', fontSize: '0.875rem' }}>
            {form.formState.errors.locations.message as string}
          </p>
        ) : null}
      </fieldset>

      <fieldset style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 16, padding: 16 }}>
        <legend style={{ padding: '0 8px', fontWeight: 700, color: 'var(--kujua-charcoal)' }}>Payments</legend>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
            <input type="checkbox" {...form.register('payment.required')} />
            Require payment
          </label>

          <div>
            <label htmlFor="payment-mode" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Mode</label>
            <select id="payment-mode" className="kujua-input" {...form.register('payment.mode')}>
              <option value="free">Free</option>
              <option value="deposit">Deposit</option>
              <option value="full">Full payment</option>
            </select>
          </div>

          <div>
            <label htmlFor="payment-currency" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Currency</label>
            <input id="payment-currency" className="kujua-input" {...form.register('payment.currency')} />
          </div>

          <div>
            <label htmlFor="payment-amount" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Amount</label>
            <input id="payment-amount" className="kujua-input" type="number" step="0.01" {...form.register('payment.amount', { valueAsNumber: true })} />
          </div>
        </div>
      </fieldset>

      <button type="submit" className="btn-primary" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving…' : mode === 'create' ? 'Create event type' : 'Save changes'}
      </button>
    </form>
  )
}

export function EventTypePreviewPanel({ preview }: { preview: EventTypePreview }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
      <p className="kujua-eyebrow" style={{ marginBottom: 12 }}>Public preview</p>
      <h2 style={{ marginBottom: 10 }}>{preview.title}</h2>
      <p style={{ marginBottom: 20 }}>{preview.summary}</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {[
          ['Duration', preview.durationLabel],
          ['Locations', preview.locations.join(', ')],
          ['Payment', preview.paymentLabel],
          ['Approvals', preview.approvalLabel],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--kujua-gray-100)' }}>
            <span style={{ color: 'var(--kujua-gray-600)' }}>{label}</span>
            <span style={{ color: 'var(--kujua-charcoal)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
