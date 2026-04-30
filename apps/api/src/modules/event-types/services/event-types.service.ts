import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EventTypesRepository } from '../repositories/event-types.repository';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';

@Injectable()
export class EventTypesService {
  constructor(private readonly repo: EventTypesRepository) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }

  async findById(id: string) {
    if (!id || id === 'undefined') {
      throw new NotFoundException('Event type not found.');
    }
    const et = await this.repo.findById(id);
    if (!et) throw new NotFoundException('Event type not found.');
    return et;
  }

  async findBySlug(workspaceId: string, slug: string) {
    const et = await this.repo.findBySlug(workspaceId, slug);
    if (!et || et.status === 'archived') throw new NotFoundException('Event type not found.');
    return et;
  }

  async findFirstBookable(workspaceId: string) {
    const et = await this.repo.findFirstBookable(workspaceId);
    if (!et) throw new NotFoundException('No bookable event type found.');
    return et;
  }

  async create(workspaceId: string, dto: CreateEventTypeDto) {
    const existing = await this.repo.findBySlug(workspaceId, dto.slug);
    if (existing) throw new ConflictException('An event type with this slug already exists.');
    return this.repo.create({
      ...dto,
      payment: this.normalizePayment(dto.payment),
      status: dto.status ?? 'published',
      workspaceId,
    });
  }

  async update(id: string, dto: UpdateEventTypeDto) {
    await this.findById(id);
    const update = dto.payment ? { ...dto, payment: this.normalizePayment(dto.payment) } : dto;
    return this.repo.updateById(id, update as any);
  }

  async duplicate(id: string) {
  const original = await this.findById(id)
  const data = original.toObject() as Record<string, any>

  delete data._id
  delete data.id

  data.name = `${data.name} (copy)`
  data.slug = `${data.slug}-copy-${Date.now()}`
  data.status = 'draft'

  return this.repo.create(data)
  }

  async archive(id: string) { return this.repo.updateById(id, { status: 'archived' }); }
  async delete(id: string) { return this.repo.deleteById(id); }

  async getPreview(id: string) {
    const et = await this.findById(id);
    return {
      id: et.id,
      title: et.name,
      summary: et.description ?? '',
      durationLabel: `${et.durationMinutes} min`,
      locations: et.locations,
      paymentLabel: et.payment?.mode === 'free' ? 'Free' : `${et.payment?.currency} ${et.payment?.amount ?? ''}`,
      approvalLabel: et.requiresApproval ? 'Requires approval' : 'Instant booking',
    };
  }

  private normalizePayment(payment?: CreateEventTypeDto['payment']) {
    const requestedMode = payment?.mode ?? 'free';
    const mode = payment?.required && requestedMode === 'free' ? 'full' : requestedMode;
    const amount = mode === 'free' ? null : payment?.amount ?? 0;

    return {
      required: mode !== 'free',
      mode,
      amount,
      currency: payment?.currency ?? 'USD',
    };
  }
}
