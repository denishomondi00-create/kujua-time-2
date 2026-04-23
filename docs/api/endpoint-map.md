# API endpoint map

## Auth
- POST `/v1/auth/signup`
- POST `/v1/auth/login`
- POST `/v1/auth/logout`
- POST `/v1/auth/refresh`
- POST `/v1/auth/forgot-password`
- POST `/v1/auth/reset-password`
- POST `/v1/auth/verify-email`
- GET `/v1/auth/session`

## Workspace
- GET `/v1/workspaces/current`
- PATCH `/v1/workspaces/current`
- GET `/v1/workspaces/current/branding`
- PATCH `/v1/workspaces/current/branding`
- GET `/v1/workspaces/current/plan`

## Public booking
- GET `/v1/public/booking-pages/:workspaceSlug/*path`
- GET `/v1/public/event-types/:publicEventId/slots`
- POST `/v1/public/booking-holds`
- PATCH `/v1/public/booking-holds/:holdId`
- POST `/v1/public/payments/checkout`
- GET `/v1/public/payments/status/:paymentAttemptId`
- POST `/v1/public/bookings/confirm-free`
- POST `/v1/public/bookings/confirm-paid`
- GET `/v1/public/bookings/:publicBookingToken`
- POST `/v1/public/bookings/:publicBookingToken/reschedule`
- POST `/v1/public/bookings/:publicBookingToken/cancel`

## Webhooks
- POST `/v1/webhooks/stripe`
- POST `/v1/webhooks/paystack`
- POST `/v1/webhooks/postmark`
- POST `/v1/webhooks/resend`
- POST `/v1/webhooks/sms/:provider`
- POST `/v1/webhooks/whatsapp/:provider`
