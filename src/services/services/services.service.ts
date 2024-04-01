import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesEntity } from '../entities/service.entity';
import { Equal, Repository } from 'typeorm';
import { Pagination } from 'src/common/interfaces/base.repository';
import { CreateServiceDto } from '../dtos/create-services.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesEntity)
    private servicesRepository: Repository<ServicesEntity>,
  ) {}

  deleteService = async (userId: string, id: string): Promise<void> => {
    await this.servicesRepository.update(
      {
        id,
        user: { id: userId },
      },
      { deletedAt: new Date() },
    );
  };

  createService = async (
    userId: string,
    { name, description, schedules, emoji }: CreateServiceDto,
  ): Promise<void> => {
    const service = this.servicesRepository.create({
      id: uuidv4(),
      name,
      description,
      emoji,
      user: { id: userId },
      schedules: schedules.map((schedule) => ({
        ...schedule,
        id: uuidv4(),
        isReserved: false,
      })),
    });

    await this.servicesRepository.save(service);
  };

  findServices = async (
    userId: string,
    { skip, take }: Pagination,
  ): Promise<ServicesEntity[]> => {
    const services = await this.servicesRepository.find({
      take,
      skip,
      where: { deletedAt: null, user: { id: userId } },
    });

    return services.filter((service) => !service.deletedAt);
  };

  findServiceById = async (
    userId: string,
    id: string,
  ): Promise<ServicesEntity> => {
    return await this.servicesRepository.findOne({
      where: { id, user: { id: userId }, deletedAt: null },
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
      .where('services.deleted_at IS NULL')
      .leftJoinAndSelect('services.schedules', 'schedules')
      .getMany();
  };
}
