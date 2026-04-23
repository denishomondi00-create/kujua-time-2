import { Controller, Get, Post, Param, Query, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../../shared/decorators/current-workspace.decorator';
import { BookingsService } from '../services/bookings.service';
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto';
import { CancelBookingDto } from '../dto/cancel-booking.dto';
import { RescheduleBookingDto } from '../dto/reschedule-booking.dto';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Get()
  async list(@CurrentWorkspace() workspaceId: string, @Query() query: PaginationQueryDto & { status?: string }) {
    return this.service.list(workspaceId, query);
  }

  @Get(':bookingId')
  async findOne(@Param('bookingId') id: string) { return this.service.findById(id); }

  @Post(':bookingId/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Param('bookingId') id: string, @Body() dto: CancelBookingDto) { return this.service.cancel(id, dto); }

  @Post(':bookingId/approve')
  @HttpCode(HttpStatus.OK)
  async approve(@Param('bookingId') id: string) { return this.service.approve(id); }

  @Post(':bookingId/complete')
  @HttpCode(HttpStatus.OK)
  async complete(@Param('bookingId') id: string) { return this.service.complete(id); }

  @Post(':bookingId/no-show')
  @HttpCode(HttpStatus.OK)
  async noShow(@Param('bookingId') id: string) { return this.service.markNoShow(id); }

  @Post(':bookingId/reschedule')
  @HttpCode(HttpStatus.OK)
  async reschedule(@Param('bookingId') id: string, @Body() dto: RescheduleBookingDto) { return this.service.rescheduleBooking(id, dto); }
}
