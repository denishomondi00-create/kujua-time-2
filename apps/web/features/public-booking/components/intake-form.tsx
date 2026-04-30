"use client"

import { useState } from "react"

import { FormField } from "@/components/forms/form-field"
import { SubmitButton } from "@/components/forms/submit-button"
import { TextArea } from "@/components/forms/text-area"
import { TextInput } from "@/components/forms/text-input"
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
  const updateHold = useUpdateBookingHoldMutation(hold.id)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextHold = await updateHold.mutateAsync(values)
    onCompleted(nextHold)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name">
          <TextInput
            required
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.fullName}
            onChange={(event) => setValues((current) => ({ ...current, fullName: event.target.value }))}
          />
        </FormField>
        <FormField label="Email">
          <TextInput
            required
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          />
        </FormField>
      </div>

      <div className="grid gap-4">
        <FormField label="Phone">
          <TextInput
            type="tel"
            autoComplete="tel"
            placeholder="+254 700 000 000"
            value={values.phone}
            onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
          />
        </FormField>
      </div>

      <FormField label="Notes" hint="Optional">
        <TextArea
          placeholder="Anything useful before the session?"
          value={values.notes}
          onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
        />
      </FormField>

      {updateHold.isError ? (
        <p className="text-sm font-medium text-rose-600">
          Please check your details and try again.
        </p>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton className="w-full sm:w-auto" isLoading={updateHold.isPending}>
          Save and continue
        </SubmitButton>
      </div>
    </form>
  )
}
