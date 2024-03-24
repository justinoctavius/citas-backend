import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ServicesEntity } from './service.entity';
import { ReservesEntity } from './reserves.entity';

@Entity('schedules')
export class ScheduleEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  from: Date;

  @Column({ type: 'timestamp' })
  to: Date;

  @Column()
  isReserved: boolean;

  @ManyToOne(() => ServicesEntity, (service) => service.schedules)
  service: ServicesEntity;

  @OneToOne(() => ReservesEntity, (reserve) => reserve.schedule)
  reserve: ReservesEntity;
}
