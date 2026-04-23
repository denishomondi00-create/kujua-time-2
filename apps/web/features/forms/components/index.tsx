'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateFormMutation, useUpdateFormMutation } from '@/features/forms/mutations'
import { FORM_FIELD_TYPE_OPTIONS } from '@/features/forms/utils'
import { formCreateSchema, type FormField, type FormCreateInput, type FormFieldType, type IntakeForm, type FormResponse } from '@/features/forms/schemas'
import { useFormBuilder } from '@/features/forms/hooks'

export function FormsTable({ items }: { items: IntakeForm[] }) {
  return (
    <div style={{ overflowX: 'auto', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
        <thead>
          <tr style={{ background: 'var(--kujua-gray-50)' }}>
            {['Form', 'Fields', 'Updated', 'Open'].map((column) => (
              <th key={column} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)' }}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((form) => (
            <tr key={form.id} style={{ borderTop: '1px solid var(--kujua-gray-100)' }}>
              <td style={{ padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{form.name}</div>
                <div style={{ fontSize: '0.875rem' }}>{form.description ?? 'No description provided.'}</div>
              </td>
              <td style={{ padding: '16px 18px' }}>{form.fields.length}</td>
              <td style={{ padding: '16px 18px' }}>{new Date(form.updatedAt).toLocaleDateString()}</td>
              <td style={{ padding: '16px 18px' }}>
                <Link href={`/app/forms/${form.id}`} style={{ color: 'var(--kujua-primary-teal)', fontWeight: 700 }}>
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FormsEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>No forms yet</h3>
      <p style={{ marginBottom: 20 }}>
        Intake forms help you qualify leads, collect preparation details, and keep client records organized before the meeting starts.
      </p>
      <Link href="/app/forms/new" className="btn-primary">Create form</Link>
    </section>
  )
}

export function FormFieldPalette({ onAddField }: { onAddField(type: FormFieldType): void }) {
  return (
    <section style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 18, padding: 18, background: 'var(--kujua-gray-50)' }}>
      <h3 style={{ marginBottom: 14 }}>Add field</h3>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {FORM_FIELD_TYPE_OPTIONS.map((option) => (
          <button key={option.value} type="button" className="btn-secondary" onClick={() => onAddField(option.value)} style={{ justifyContent: 'center' }}>
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}

type FieldEditorProps = {
  field: FormField
  onChange(fieldId: string, patch: Partial<FormField>): void
  onRemove(fieldId: string): void
}

export function FormFieldEditor({ field, onChange, onRemove }: FieldEditorProps) {
  return (
    <div style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 18, padding: 18, background: 'var(--kujua-white)' }}>
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '2fr 1fr', marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Label</label>
          <input className="kujua-input" value={field.label} onChange={(event) => onChange(field.id, { label: event.target.value })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Type</label>
          <select className="kujua-input" value={field.type} onChange={(event) => onChange(field.id, { type: event.target.value as FormFieldType })}>
            {FORM_FIELD_TYPE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '2fr 1fr', marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Placeholder</label>
          <input className="kujua-input" value={field.placeholder ?? ''} onChange={(event) => onChange(field.id, { placeholder: event.target.value })} />
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
            <input type="checkbox" checked={field.required} onChange={(event) => onChange(field.id, { required: event.target.checked })} />
            Required
          </label>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Help text</label>
        <input className="kujua-input" value={field.helpText ?? ''} onChange={(event) => onChange(field.id, { helpText: event.target.value })} />
      </div>

      {(field.type === 'select' || field.type === 'multi_select') ? (
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Options</label>
          <textarea
            className="kujua-input"
            rows={3}
            value={field.options.join('\n')}
            onChange={(event) => onChange(field.id, {
              options: event.target.value
                .split('\n')
                .map((option) => option.trim())
                .filter(Boolean),
            })}
          />
        </div>
      ) : null}

      <button type="button" className="btn-secondary" onClick={() => onRemove(field.id)}>Remove field</button>
    </div>
  )
}

type FormBuilderProps = {
  mode: 'create' | 'update'
  initialValues?: Partial<FormCreateInput>
  formId?: string
  onSuccess?(formId: string): void
}

export function FormBuilder({ mode, initialValues, formId, onSuccess }: FormBuilderProps) {
  const createMutation = useCreateFormMutation()
  const updateMutation = useUpdateFormMutation(formId ?? '')
  const mutation = mode === 'create' ? createMutation : updateMutation

  const builder = useFormBuilder((initialValues?.fields ?? []).map((field, index) => ({
    id: field.id ?? `draft-${index}`,
    label: field.label,
    type: field.type,
    required: field.required,
    helpText: field.helpText,
    options: field.options ?? [],
    placeholder: field.placeholder,
  })))

  const form = useForm<FormCreateInput>({
    resolver: zodResolver(formCreateSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      fields: initialValues?.fields ?? [],
    },
  })

  useEffect(() => {
    form.setValue('fields', builder.fields)
  }, [builder.fields, form])

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = mode === 'create'
      ? await createMutation.mutateAsync(values)
      : await updateMutation.mutateAsync(values)

    onSuccess?.(result.id)
  })

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Form name</label>
        <input className="kujua-input" {...form.register('name')} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Description</label>
        <textarea className="kujua-input" rows={3} {...form.register('description')} />
      </div>

      <FormFieldPalette onAddField={builder.addField} />

      <div style={{ display: 'grid', gap: 14 }}>
        {builder.fields.map((field) => (
          <FormFieldEditor key={field.id} field={field} onChange={builder.updateField} onRemove={builder.removeField} />
        ))}
      </div>

      {form.formState.errors.fields ? <p style={{ margin: 0, color: 'var(--kujua-error)' }}>{form.formState.errors.fields.message as string}</p> : null}

      <button type="submit" className="btn-primary" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving…' : mode === 'create' ? 'Create form' : 'Save form'}
      </button>
    </form>
  )
}

export function FormResponsesPanel({ responses }: { responses: FormResponse[] }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Responses</h3>
      {responses.length === 0 ? (
        <p style={{ margin: 0 }}>Responses will appear here once the form is attached to an event type or public flow.</p>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {responses.map((response) => (
            <div key={response.id} style={{ border: '1px solid var(--kujua-gray-200)', borderRadius: 16, padding: 16 }}>
              <div style={{ marginBottom: 12, fontWeight: 700, color: 'var(--kujua-charcoal)' }}>
                Submitted {new Date(response.submittedAt).toLocaleString()}
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(response.values, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
