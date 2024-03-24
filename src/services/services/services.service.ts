import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesEntity } from '../entities/service.entity';
import { Like, Repository } from 'typeorm';
import { Pagination } from 'src/common/interfaces/base.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesEntity)
    private servicesRepository: Repository<ServicesEntity>,
  ) {}

  findServices = async (
    userId: string,
    { skip, take }: Pagination,
  ): Promise<ServicesEntity[]> => {
    return await this.servicesRepository.find({
      skip,
      take,
      where: { user: { id: userId } },
    });
  };

  findServiceById = async (
    userId: string,
    id: string,
  ): Promise<ServicesEntity> => {
    return await this.servicesRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['schedules', 'reserves'],
    });
  };

  searchServices = async ({
    query,
  }: {
    query: string;
  }): Promise<ServicesEntity[]> => {
    return await this.servicesRepository
      .createQueryBuilder('services')
      .where('services.name ILIKE :name', {
        name: `%${query}%`,
      })
      .leftJoinAndSelect('services.schedules', 'schedules')
      .getMany();
  };
}
