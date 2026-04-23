import { Controller, Get, Param } from '@nestjs/common'
import { BookingPagesService } from '../services/booking-pages.service'

@Controller('public/booking-pages')
export class PublicBookingPagesController {
  constructor(private readonly service: BookingPagesService) {}

  @Get(':workspaceSlug')
  async getPage(@Param('workspaceSlug') slug: string) {
    return this.service.getPublicPageModel(slug)
  }

  @Get(':workspaceSlug/*path')
  async getPageWithPath(@Param('workspaceSlug') slug: string, @Param('path') path: string) {
    return this.service.getPublicPageModel(slug, path)
  }
}