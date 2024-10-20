import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('Admin')
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: "Berhasil Mendapatkan Semua User!",
      statusCode: HttpStatus.OK,
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException({
        message: `User dengan ID ${id} tidak ditemukan!`,
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
    return {
      message: `Berhasil Mendapatkan User dengan ID ${id}`,
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    if (!user) {
      throw new NotFoundException({
        message: `User dengan ID ${id} tidak ditemukan!`,
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
    return {
      message: `Berhasil Memperbarui User dengan ID ${id}`,
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (!result) {
      throw new NotFoundException({
        message: `User dengan ID ${id} tidak ditemukan!`,
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
    return {
      message: "Berhasil Menghapus Data User!",
      statusCode: HttpStatus.OK,
      data: null,
    };
  }
}
