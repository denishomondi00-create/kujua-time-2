import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Kujua Time API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Bootstrap', () => {
    it('should start the application', () => {
      expect(app).toBeDefined();
    });
  });

  describe('Auth endpoints', () => {
    it('POST /v1/auth/signup should reject invalid payload', () => {
      return request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send({})
        .expect(400);
    });

    it('POST /v1/auth/login should reject missing credentials', () => {
      return request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({})
        .expect(400);
    });
  });

  describe('Protected endpoints', () => {
    it('GET /v1/bookings should return 401 without auth', () => {
      return request(app.getHttpServer())
        .get('/v1/bookings')
        .expect(401);
    });

    it('GET /v1/clients should return 401 without auth', () => {
      return request(app.getHttpServer())
        .get('/v1/clients')
        .expect(401);
    });

    it('GET /v1/event-types should return 401 without auth', () => {
      return request(app.getHttpServer())
        .get('/v1/event-types')
        .expect(401);
    });
  });
});
