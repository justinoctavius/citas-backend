import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { Passwordless } from 'src/auth/entities/passwordless.entity';
import { ServicesEntity } from 'src/services/entities/service.entity';
import { ReservesEntity } from 'src/services/entities/reserves.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Passwordless, (passwordless) => passwordless.user)
  passwordless: Passwordless;

  @OneToMany(() => ServicesEntity, (service) => service.user)
  services: ServicesEntity[];

  @OneToMany(() => ReservesEntity, (reserve) => reserve.user)
  reserves: ReservesEntity[];
}
