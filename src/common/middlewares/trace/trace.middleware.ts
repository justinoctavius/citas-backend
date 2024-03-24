import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createNamespace } from 'cls-hooked';

const session = createNamespace('books-reader');

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const traceId = uuidv4();

    session.run(() => {
      session.set('traceId', traceId);
      next();
    });
  }
}
