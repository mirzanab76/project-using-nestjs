import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Periksa apakah role dengan nama yang sama sudah ada
    const existingRole = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name }, // Ganti dengan kolom yang sesuai
    });
    if (existingRole) {
      throw new ConflictException('Role dengan nama tersebut sudah ada');
    }
  
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
 
  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.roleRepository.delete(id);
    return result.affected > 0; // Jika affected > 0 artinya ada yang terhapus
  }  
}