import { Test, TestingModule } from '@nestjs/testing';
import { PublicBookingsController } from '../controllers/public-bookings.controller';
import { BookingsService } from '../services/bookings.service';

describe('PublicBookingsController', () => {
  let controller: PublicBookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicBookingsController],
      providers: [{ provide: BookingsService, useValue: { confirmFree: jest.fn(), findByToken: jest.fn() } }],
    }).compile();

    controller = module.get<PublicBookingsController>(PublicBookingsController);
  });

  it('should be defined', () => { expect(controller).toBeDefined(); });
});
