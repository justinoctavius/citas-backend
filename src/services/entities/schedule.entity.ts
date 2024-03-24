import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @Column({ name: 'is_reserved' })
  isReserved: boolean;

  @ManyToOne(() => ServicesEntity, (service) => service.schedules)
  @JoinColumn({ name: 'service_id' })
  service: ServicesEntity;

  @OneToOne(() => ReservesEntity, (reserve) => reserve.schedule)
  reserve: ReservesEntity;
}
