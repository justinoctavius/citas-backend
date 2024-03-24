import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservesEntity } from '../entities/reserves.entity';
import { Repository } from 'typeorm';
import { ReserveScheduleDto } from '../dtos/reserve-schedyles.dto';
import { ScheduleEntity } from '../entities/schedule.entity';
import { Pagination } from 'src/common/interfaces/base.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReservesService {
  constructor(
    @InjectRepository(ReservesEntity)
    private readonly reservesRepository: Repository<ReservesEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly schedulesRepository: Repository<ScheduleEntity>,
  ) {}

  reserveSchedule = async (
    userId: string,
    {
      email,
      firstName,
      lastName,
      scheduleId,
      serviceId,
    }: {
      email: string;
      firstName: string;
      lastName: string;
      scheduleId: string;
      serviceId: string;
    },
  ) => {
    const schedule = await this.findScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    if (schedule.isReserved) {
      throw new BadRequestException('Schedule already reserved');
    }

    await this.reservesRepository.save({
      id: uuidv4(),
      email,
      firstName,
      lastName,
      schedule,
      service: { id: serviceId },
      user: { id: userId },
    });

    schedule.isReserved = true;
    await this.schedulesRepository.save(schedule);
  };

  findScheduleById = async (id: string): Promise<ScheduleEntity> => {
    return await this.schedulesRepository.findOne({ where: { id } });
  };

  findReservesByUserId = async (
    userId: string,
    { skip = 0, take = 20 }: Pagination,
  ): Promise<ReservesEntity[]> => {
    return await this.reservesRepository.find({
      where: { user: { id: userId } },
      skip,
      take,
      relations: ['service', 'schedule'],
      loadEagerRelations: false,
    });
  };

  cancelReserve = async (
    userId: string,
    { reserveId, serviceId }: { reserveId: string; serviceId: string },
  ) => {
    const reserve = await this.reservesRepository.findOne({
      where: {
        id: reserveId,
        user: { id: userId },
        service: { id: serviceId },
      },
      relations: ['schedule'],
    });

    if (!reserve) {
      throw new NotFoundException('Reserve not found');
    }

    const schedule = await this.findScheduleById(reserve.schedule.id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    await this.reservesRepository.remove(reserve);

    schedule.isReserved = false;
    await this.schedulesRepository.save(schedule);
  };
}
