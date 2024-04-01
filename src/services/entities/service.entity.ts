import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { ReservesEntity } from './reserves.entity';
import { User } from 'src/users/entities/user.entity';
import { Transform } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('services')
export class ServicesEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Transform(({ value }) => value.toLowerCase(), { toPlainOnly: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  emoji: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.service, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schedules: ScheduleEntity[];

  @OneToMany(() => ReservesEntity, (reserve) => reserve.service)
  reserves: ReservesEntity[];

  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
