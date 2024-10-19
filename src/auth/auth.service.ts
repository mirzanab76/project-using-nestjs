import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['role'] });
    if (user && await user.validatePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.role_id === undefined) {
      throw new BadRequestException('role_id is required and must be a valid integer');
    }
    const { role_id, password, ...userData } = createUserDto;
    const role = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!role) {
      throw new NotFoundException('Role tidak ditemukan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role,
    });

    return await this.userRepository.save(user);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role.role_name};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}