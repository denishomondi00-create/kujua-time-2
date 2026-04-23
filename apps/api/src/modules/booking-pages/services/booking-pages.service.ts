import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingPagesRepository } from '../repositories/booking-pages.repository';
import { WorkspacesService } from '../../workspaces/services/workspaces.service';

@Injectable()
export class BookingPagesService {
  constructor(
    private readonly repo: BookingPagesRepository,
    private readonly workspacesService: WorkspacesService,
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

    return {
      workspace: { id: workspace.id, slug: workspace.slug, name: workspace.name, tagline: workspace.tagline, timezone: workspace.timezone },
      theme: page ? { accentColor: page.accentColor, accentSoft: page.accentSoft, logoUrl: page.logoUrl, coverImageUrl: page.coverImageUrl, radius: page.radius, themeClassName: page.themeClassName } : {},
      trust: page ? { bullets: page.trustBullets, faq: page.faq, policies: page.policies } : {},
    };
  }
}
