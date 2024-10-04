import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

@Post()
@HttpCode(HttpStatus.CREATED)
async create(@Body() createRoleDto: CreateRoleDto) {
  try {
    const role = await this.rolesService.create(createRoleDto);
    return {
      message: "Berhasil Menambahkan Role!",
      statusCode: HttpStatus.CREATED,
      data: role,
    };
  } catch (error) {
    if (error instanceof ConflictException) {
      throw new ConflictException({
        message: error.message,
        statusCode: HttpStatus.CONFLICT,
        data: null,
      });
    }
    throw new InternalServerErrorException({
      message: "Terjadi kesalahan saat menambahkan role!",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
}

  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return {
      message: "Berhasil Mendapatkan Semua Role!",
      statusCode: HttpStatus.OK,
      data: roles,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(+id);
    if (!role) {
      throw new NotFoundException({
        message: `Role dengan ID ${id} tidak ditemukan!`,
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
    return {
      message: `Berhasil Mendapatkan Role dengan ID ${id}`,
      statusCode: HttpStatus.OK,
      data: role,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesService.update(+id, updateRoleDto);
    if (!role) {
      throw new NotFoundException({
        message: `Role dengan ID ${id} tidak ditemukan!`,
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
    return {
      message: `Berhasil Memperbarui Role dengan ID ${id}`,
      statusCode: HttpStatus.OK,
      data: role,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.rolesService.remove(+id);
    if (!result) {
      throw new NotFoundException({
        message: `Role dengan ID ${id} tidak ditemukan!`,
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
    return {
      message: "Berhasil Menghapus Data Role!",
      statusCode: HttpStatus.OK,
      data: null,
    };
  }
}
