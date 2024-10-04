import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity'; // Jika perlu mengimpor Role
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // Menghubungkan User dan Role di modul ini
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule], // Pastikan TypeOrmModule diekspor
})
export class UsersModule {}
