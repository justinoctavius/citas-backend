import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from '../entities/schedule.entity';
import { ServicesEntity } from '../entities/service.entity';
import { ReservesEntity } from '../entities/reserves.entity';
import { ServicesService } from './services.service';
import { ReservesService } from './reserves.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity, ServicesEntity, ReservesEntity]),
  ],
  providers: [ServicesService, ReservesService],
  exports: [ServicesService, ReservesService],
})
export class ServicesServiceModule {}
