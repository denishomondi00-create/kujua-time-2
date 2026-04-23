import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Infra
import { MongoModule } from './infra/db/mongo.module';
import { RedisModule } from './infra/cache/redis.module';
import { BullMQModule } from './infra/queue/bullmq.module';
import { MessagingModule } from './infra/messaging/messaging.module';
import { PaymentsInfraModule } from './infra/payments/payments.module';
import { CalendaringModule } from './infra/calendaring/calendaring.module';
import { StorageModule } from './infra/storage/storage.module';
import { LoggingModule } from './infra/observability/logging.module';
import { TracingModule, TracingMiddleware } from './infra/observability/tracing.module';
import { MetricsModule } from './infra/observability/metrics.module';
import { SentryModule } from './infra/observability/sentry.module';

// Domain modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { WorkspaceMembersModule } from './modules/workspace-members/workspace-members.module';
import { BookingPagesModule } from './modules/booking-pages/booking-pages.module';
import { EventTypesModule } from './modules/event-types/event-types.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BookingHoldsModule } from './modules/booking-holds/booking-holds.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ClientNotesModule } from './modules/client-notes/client-notes.module';
import { FormsModule } from './modules/forms/forms.module';
import { FormResponsesModule } from './modules/form-responses/form-responses.module';
import { CalendarsModule } from './modules/calendars/calendars.module';
import { CalendarSyncModule } from './modules/calendar-sync/calendar-sync.module';
import { MeetingLocationsModule } from './modules/meeting-locations/meeting-locations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PackagesModule } from './modules/packages/packages.module';
import { AutomationsModule } from './modules/automations/automations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { FilesModule } from './modules/files/files.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    // Config — must be first, isGlobal makes it available everywhere
    ConfigModule.forRoot({ isGlobal: true }),

    // Infrastructure layer — global modules for DB, cache, queues, providers
    MongoModule,
    RedisModule,
    BullMQModule,
    MessagingModule,
    PaymentsInfraModule,
    CalendaringModule,
    StorageModule,

    // Observability
    LoggingModule,
    TracingModule,
    MetricsModule,
    SentryModule,

    // Domain modules
    AuthModule,
    UsersModule,
    WorkspacesModule,
    WorkspaceMembersModule,
    BookingPagesModule,
    EventTypesModule,
    AvailabilityModule,
    BookingsModule,
    BookingHoldsModule,
    ClientsModule,
    ClientNotesModule,
    FormsModule,
    FormResponsesModule,
    CalendarsModule,
    CalendarSyncModule,
    MeetingLocationsModule,
    PaymentsModule,
    InvoicesModule,
    PackagesModule,
    AutomationsModule,
    NotificationsModule,
    WebhooksModule,
    FilesModule,
    ReportsModule,
    AdminModule,
    AuditModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Attach trace IDs to all incoming requests
    consumer.apply(TracingMiddleware).forRoutes('*');
  }
}
