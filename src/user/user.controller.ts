import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { Msg } from './interfaces/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  createUser(@Body() dto: UserDto): Promise<Msg> {
    return this.userService.createUser(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user;
  }
}
