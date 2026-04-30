import { Controller, Post, Patch, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingHoldsService } from '../services/booking-holds.service';
import { BookingHoldMapper } from '../mappers/booking-hold.mapper';
import { CreateBookingHoldDto } from '../dto/create-booking-hold.dto';
import { UpdateBookingHoldDto } from '../dto/update-booking-hold.dto';

@Controller('public/booking-holds')
export class BookingHoldsController {
  constructor(private readonly service: BookingHoldsService) {}

  @Post()
  async create(@Body() body: CreateBookingHoldDto) {
    return BookingHoldMapper.toResponse(await this.service.create(body));
  }

  @Patch(':holdId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('holdId') holdId: string, @Body() body: UpdateBookingHoldDto) {
    return BookingHoldMapper.toResponse(await this.service.updateDetails(holdId, body));
  }
}
