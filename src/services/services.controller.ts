import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'src/common/interfaces/base.repository';
import { ReserveScheduleDto } from './dtos/reserve-schedyles.dto';
import { ReservesService } from './services/reserves.service';
import { ServicesService } from './services/services.service';
import { TokenGuard } from 'src/common/guards/auth/token.guard';
import { GetUser } from 'src/common/decorators/users/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly reservesService: ReservesService,
    private readonly servicesService: ServicesService,
  ) {}

  @Get()
  @UseGuards(TokenGuard)
  async findServices(@Query() query: Pagination, @GetUser() user: User) {
    const { skip, take } = query;
    return await this.servicesService.findServices(user.id, { skip, take });
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  async findServiceById(@Param('id') id: string, @GetUser() user: User) {
    return await this.servicesService.findServiceById(user.id, id);
  }

  @Get('search')
  async searchServices(@Query() query: { query: string }) {
    const { query: searchQuery } = query;
    return await this.servicesService.searchServices({ query: searchQuery });
  }

  @Get('reserves')
  @UseGuards(TokenGuard)
  async findReserves(@Query() query: Pagination, @GetUser() user: User) {
    const { skip, take } = query;
    return await this.reservesService.findReservesByUserId(user.id, {
      skip,
      take,
    });
  }

  @Post(':id/schedules/:scheduleId/reserve')
  @UseGuards(TokenGuard)
  async reserveSchedule(
    @Param('id') id: string,
    @Param('scheduleId') scheduleId: string,
    @Body() body: ReserveScheduleDto,
    @GetUser() user: User,
  ) {
    return await this.reservesService.reserveSchedule(user.id, {
      scheduleId,
      serviceId: id,
      ...body,
    });
  }

  @Post(':id/reserve/:reserveId/cancel')
  @UseGuards(TokenGuard)
  async cancelReserve(
    @Param('reserveId') reserveId: string,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return await this.reservesService.cancelReserve(user.id, {
      reserveId,
      serviceId: id,
    });
  }
}
