import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from '@prisma/client';
import { randomUUID } from 'crypto';
@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}
  getSchedules(userId: string): Promise<Schedule[]> {
    console.log(userId);
    return this.prisma.schedule.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getScheduleById(userId: string, scheduleId: string): Promise<Schedule> {
    return this.prisma.schedule.findFirst({
      where: {
        userId,
        scheduleId: scheduleId,
      },
    });
  }

  async createSchedule(
    userId: string,
    dto: CreateScheduleDto,
  ): Promise<Schedule> {
    const scheduleId = randomUUID();
    const schedule = await this.prisma.schedule.create({
      data: {
        userId,
        ...dto,
        scheduleId,
      },
    });
    return schedule;
  }

  async deleteScheduleById(userId: string, scheduleId: string): Promise<void> {
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        scheduleId: scheduleId,
      },
    });

    if (!schedule || schedule.userId !== userId)
      throw new ForbiddenException('No permision to delete');

    await this.prisma.schedule.delete({
      where: {
        scheduleId: scheduleId,
      },
    });
  }
}
