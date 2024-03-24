import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TraceMiddleware } from './common/middlewares/trace/trace.middleware';

@Module({
  imports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes('*');
  }
}
