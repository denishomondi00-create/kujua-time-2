import { Controller, Post, Patch, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingHoldsService } from '../services/booking-holds.service';

@Controller('public/booking-holds')
export class BookingHoldsController {
  constructor(private readonly service: BookingHoldsService) {}

  @Post()
  async create(@Body() body: { publicEventId: string; timezone: string; startAt: string; endAt: string }) {
    return this.service.create(body);
  }

  @Patch(':holdId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('holdId') holdId: string, @Body() body: any) {
    return this.service.updateDetails(holdId, body);
  }
}
