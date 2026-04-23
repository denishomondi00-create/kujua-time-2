import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { KujuaLogger } from './infra/observability/logging.module'
import { SentryExceptionFilter } from './infra/observability/sentry.module'
import { SentryService } from './infra/observability/sentry.module'
import { ResponseTransformInterceptor } from './shared/interceptors/response-transform.interceptor'
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor'
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor'
import { TrimStringsPipe } from './shared/pipes/trim-strings.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  const logger = app.get(KujuaLogger)
  app.useLogger(logger)

  app.setGlobalPrefix('v1')

  app.use(cookieParser())

  app.useGlobalPipes(
    new TrimStringsPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TimeoutInterceptor(reflector),
    new ResponseTransformInterceptor(),
  )

  const sentryService = app.get(SentryService)
  app.useGlobalFilters(new SentryExceptionFilter(sentryService))

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Workspace-Id',
      'X-Idempotency-Key',
      'X-Trace-Id',
    ],
    exposedHeaders: ['X-Trace-Id'],
  })

  app.enableShutdownHooks()

  const port = process.env.PORT ?? 4000
  await app.listen(port)
  Logger.log(`Kujua Time API running on port ${port}`, 'Bootstrap')
}

bootstrap()