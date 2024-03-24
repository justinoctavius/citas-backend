import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { ServicesEntity } from './service.entity';
import { User } from 'src/users/entities/user.entity';
import { Transform } from 'class-transformer';

@Entity('reserves')
export class ReservesEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Transform(({ value }) => value.toLowerCase(), { toPlainOnly: true })
  firstName: string;

  @Column({ name: 'last_name' })
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Transform(({ value }) => value.toLowerCase(), { toPlainOnly: true })
  lastName: string;

  @Column({ name: 'email' })
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Transform(({ value }) => value.toLowerCase(), { toPlainOnly: true })
  email: string;

  @OneToOne(() => ScheduleEntity, (schedule) => schedule.reserve)
  @JoinColumn({ name: 'schedule_id' })
  schedule: ScheduleEntity;

  @ManyToOne(() => ServicesEntity, (service) => service.reserves, {
    eager: true,
  })
  @JoinColumn({ name: 'service_id' })
  service: ServicesEntity;

  @ManyToOne(() => User, (user) => user.reserves)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
