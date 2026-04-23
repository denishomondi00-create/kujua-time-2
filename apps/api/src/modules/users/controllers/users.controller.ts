import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@CurrentUser() user: any) {
    const entity = await this.usersService.findById(user?.id ?? user?.sub);
    return UserMapper.toResponse(entity);
  }

  @Get(':userId')
  async getById(@Param('userId') userId: string) {
    const entity = await this.usersService.findById(userId);
    return UserMapper.toResponse(entity);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const entity = await this.usersService.create(dto);
    return UserMapper.toResponse(entity);
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
    const entity = await this.usersService.update(userId, dto);
    return UserMapper.toResponse(entity);
  }
}
