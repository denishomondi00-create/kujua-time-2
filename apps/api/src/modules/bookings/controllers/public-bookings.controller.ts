import { Controller, Get, Post, Param, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { ConfirmFreeBookingDto, ConfirmPaidBookingDto } from '../dto/confirm-booking.dto';
import { RescheduleBookingDto } from '../dto/reschedule-booking.dto';
import { CancelBookingDto } from '../dto/cancel-booking.dto';

@Controller('public')
export class PublicBookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post('bookings/confirm-free')
  @HttpCode(HttpStatus.OK)
  async confirmFree(@Body() dto: ConfirmFreeBookingDto) { return this.service.confirmFree(dto.holdId); }

  @Post('bookings/confirm-paid')
  @HttpCode(HttpStatus.OK)
  async confirmPaid(@Body() dto: ConfirmPaidBookingDto) { return this.service.confirmPaid(dto.paymentAttemptId); }

  @Get('bookings/:publicBookingToken')
  async lookup(@Param('publicBookingToken') token: string) { return this.service.findByToken(token); }

  @Post('bookings/:publicBookingToken/reschedule')
  @HttpCode(HttpStatus.OK)
  async reschedule(@Param('publicBookingToken') token: string, @Body() dto: RescheduleBookingDto) {
    return this.service.rescheduleByToken(token, dto);
  }

  @Post('bookings/:publicBookingToken/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Param('publicBookingToken') token: string, @Body() dto: CancelBookingDto) {
    return this.service.cancelByToken(token, dto.reason);
  }
}
