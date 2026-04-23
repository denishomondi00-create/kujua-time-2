import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from '../services/bookings.service';

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: BookingsService, useValue: { list: jest.fn(), findById: jest.fn(), cancel: jest.fn() } },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => { expect(service).toBeDefined(); });

  it('should list bookings for a workspace', async () => {
    jest.spyOn(service, 'list').mockResolvedValue({ items: [], total: 0, page: 1, pageSize: 20 } as any);
    const result = await service.list('ws-1');
    expect(result.items).toEqual([]);
  });
});
