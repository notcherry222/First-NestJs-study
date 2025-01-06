import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';

@Module({
  imports: [UsersModule],
  controllers: [ApiController],
})
export class AppModule {}
