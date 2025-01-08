import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      entities: [User]
    })
  ]
})
export class AppModule {}
