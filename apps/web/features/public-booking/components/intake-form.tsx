"use client"

import { useState } from "react"

import { FormField } from "@/components/forms/form-field"
import { SubmitButton } from "@/components/forms/submit-button"
import { TextArea } from "@/components/forms/text-area"
import { TextInput } from "@/components/forms/text-input"
import { AlertBanner } from "@/components/feedback/alert-banner"
import { useUpdateBookingHoldMutation } from "@/features/public-booking/mutations"
import type { BookingHold } from "@/features/public-booking/schemas/public-booking.schemas"

export function IntakeForm({
  hold,
  onCompleted,
}: {
  hold: BookingHold
  onCompleted: (hold: BookingHold) => void
}) {
  const [values, setValues] = useState({
    fullName: hold.client.fullName ?? "",
    email: hold.client.email ?? "",
    phone: hold.client.phone ?? "",
    notes: hold.client.notes ?? "",
  })
  const updateHold = useUpdateBookingHoldMutation()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextHold = await updateHold.mutateAsync({
      holdId: hold.id,
      values,
    })
    onCompleted(nextHold)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <AlertBanner title="Client details">
        This client step should stay hydrated. Route shells remain server-first.
      </AlertBanner>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name">
          <TextInput
            placeholder="Jane Doe"
            value={values.fullName}
            onChange={(event) => setValues((current) => ({ ...current, fullName: event.target.value }))}
          />
        </FormField>
        <FormField label="Email">
          <TextInput
            type="email"
            placeholder="jane@example.com"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone">
          <TextInput
            placeholder="+254 700 000 000"
            value={values.phone}
            onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
          />
        </FormField>
        <div className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-muted)] p-4 text-sm text-[var(--kt-muted-foreground)]">
          Intake questions can expand here through form schema-driven rendering.
        </div>
      </div>

      <FormField label="Notes" hint="Optional">
        <TextArea
          placeholder="Anything useful before the session?"
          value={values.notes}
          onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
        />
      </FormField>

      <div className="flex justify-end">
        <SubmitButton isLoading={updateHold.isPending}>
          Save and continue
        </SubmitButton>
      </div>
    </form>
  )
}
