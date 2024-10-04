import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: "Berhasil Menambahkan User!",
      statusCode: HttpStatus.CREATED,
      data: user,
    };
  }

  @Get()
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
