import {
  Controller,
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  getSchedules(@Req() req: Request): Promise<Schedule[]> {
    return this.scheduleService.getSchedules(req.user.userId);
  }

  @Get(':id')
  getScheduleById(
    @Req() req: Request,
    @Param('id') scheduleId: string,
  ): Promise<Schedule> {
    return this.scheduleService.getScheduleById(req.user.userId, scheduleId);
  }

  @Post()
  createSchedule(
    @Req() req: Request,
    @Body() dto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(req.user.userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteScheduleById(
    @Req() req: Request,
    @Param('id') scheduleId: string,
  ): Promise<void> {
    return this.scheduleService.deleteScheduleById(req.user.userId, scheduleId);
  }
}
