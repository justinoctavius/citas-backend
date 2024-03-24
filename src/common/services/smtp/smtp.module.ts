import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { SMTPServices } from './smtp.service';

@Module({
  imports: [ConfigModule],
  providers: [SMTPServices],
  exports: [SMTPServices],
})
export class SMTPServicesModule {}
