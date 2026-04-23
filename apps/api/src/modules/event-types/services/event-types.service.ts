import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EventTypesRepository } from '../repositories/event-types.repository';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';

@Injectable()
export class EventTypesService {
  constructor(private readonly repo: EventTypesRepository) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }

  async findById(id: string) {
    const et = await this.repo.findById(id);
    if (!et) throw new NotFoundException('Event type not found.');
    return et;
  }

  async create(workspaceId: string, dto: CreateEventTypeDto) {
    const existing = await this.repo.findBySlug(workspaceId, dto.slug);
    if (existing) throw new ConflictException('An event type with this slug already exists.');
    return this.repo.create({ ...dto, workspaceId });
  }

  async update(id: string, dto: UpdateEventTypeDto) {
    await this.findById(id);
    return this.repo.updateById(id, dto as any);
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
}
