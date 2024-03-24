import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'passwordless' })
export class Passwordless extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 6 })
  otp: string;

  @Column({ type: 'timestamp', nullable: false, name: 'expire_at' })
  expireAt: Date;

  @Column({ name: 'expire_in' })
  expireIn: number;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.passwordless)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
