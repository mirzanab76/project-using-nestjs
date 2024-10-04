import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],  // Memastikan Role di-load
  providers: [RolesService],
  controllers: [RolesController],
  exports: [TypeOrmModule], // Ekspor TypeOrmModule untuk dipakai oleh modul lain
})
export class RolesModule {}
