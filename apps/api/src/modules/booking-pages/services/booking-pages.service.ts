import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingPagesRepository } from '../repositories/booking-pages.repository';
import { WorkspacesService } from '../../workspaces/services/workspaces.service';
import { EventTypesService } from '../../event-types/services/event-types.service';
import { SlotEngineService } from '../../availability/services/slot-engine.service';

@Injectable()
export class BookingPagesService {
  constructor(
    private readonly repo: BookingPagesRepository,
    private readonly workspacesService: WorkspacesService,
    private readonly eventTypesService: EventTypesService,
    private readonly slotEngine: SlotEngineService,
  ) {}

  async listByWorkspace(workspaceId: string) { return this.repo.findByWorkspace(workspaceId); }

  async findById(id: string) {
    const page = await this.repo.findById(id);
    if (!page) throw new NotFoundException('Booking page not found.');
    return page;
  }

  async update(id: string, data: any) { return this.repo.updateById(id, data); }

  async publish(id: string) { return this.repo.updateById(id, { published: true }); }

  async getPublicPageModel(workspaceSlug: string, eventSlug?: string) {
    const workspace = await this.workspacesService.findBySlug(workspaceSlug);
    if (!workspace) throw new NotFoundException('Workspace not found.');

    const pages = await this.repo.findByWorkspace(workspace.id);
    const page = pages[0]; // Default page
    const normalizedEventSlug = eventSlug?.split('/').filter(Boolean)[0];
    const eventType = normalizedEventSlug
      ? await this.eventTypesService.findBySlug(workspace.id, normalizedEventSlug)
      : await this.eventTypesService.findFirstBookable(workspace.id);
    const timezone = workspace.timezone ?? 'Africa/Nairobi';
    const date = new Date().toISOString().slice(0, 10);
    const slots = await this.slotEngine.computeSlots({
      workspaceId: workspace.id,
      eventTypeId: eventType.id,
      date,
      timezone,
      durationMinutes: eventType.durationMinutes,
      rules: null,
      exceptions: [],
      existingBookings: [],
    });

    return {
      workspace: {
        id: workspace.id,
        slug: workspace.slug,
        name: workspace.name,
        tagline: workspace.tagline ?? 'Book a time that works for you.',
        timezone,
      },
      theme: page ? {
        accentColor: page.accentColor,
        accentSoft: page.accentSoft,
        logoUrl: page.logoUrl,
        coverImageUrl: page.coverImageUrl,
        radius: page.radius,
        themeClassName: page.themeClassName,
      } : {},
      eventType: this.toPublicEventType(eventType),
      availabilitySnapshot: { date, timezone, slots },
      trust: page ? {
        bullets: page.trustBullets,
        faq: page.faq,
        policies: page.policies,
      } : {
        bullets: ['Secure booking confirmation.', 'Calendar-friendly scheduling.', 'Clear reminders before the event.'],
        faq: [],
        policies: [],
      },
    };
  }

  private toPublicEventType(eventType: any) {
    const payment = eventType.payment ?? { mode: 'free', amount: null, currency: 'USD' };
    const paymentMode = payment.mode === 'deposit' || payment.mode === 'full' ? payment.mode : 'free';
    const amountMajor = paymentMode === 'free' ? 0 : Number(payment.amount ?? 0);
    const amountMinor = Math.max(0, Math.round(amountMajor * 100));

    return {
      id: eventType.id,
      slug: eventType.slug,
      name: eventType.name,
      description: eventType.description ?? '',
      durationMinutes: eventType.durationMinutes,
      meetingSummary: this.getMeetingSummary(eventType.locations ?? []),
      locationLabel: this.getLocationLabel(eventType.locations ?? []),
      pricing: {
        currency: payment.currency ?? 'USD',
        amountMinor,
        paymentMode,
        ...(paymentMode === 'deposit' ? { depositAmountMinor: amountMinor } : {}),
      },
    };
  }

  private getMeetingSummary(locations: string[]) {
    if (locations.includes('in_person')) return 'Location details are shared after confirmation.';
    if (locations.includes('phone')) return 'Phone call details are shared after confirmation.';
    if (locations.includes('whatsapp')) return 'WhatsApp details are shared after confirmation.';
    if (locations.includes('zoom')) return 'Zoom link shared after confirmation.';
    if (locations.includes('custom')) return 'Meeting instructions shared after confirmation.';
    return 'Google Meet link shared after confirmation.';
  }

  private getLocationLabel(locations: string[]) {
    const labels: Record<string, string> = {
      in_person: 'In person',
      zoom: 'Zoom',
      google_meet: 'Google Meet',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      custom: 'Custom link',
    };

    return locations.map((location) => labels[location] ?? location).join(', ') || 'Online';
  }
}
