import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { Invitee } from './entities/invitee.entity';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { GuestsModule } from './guests/guests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'your-database-host',
      port: 3306,
      username: 'your-database-username',
      password: 'your-database-password',
      database: 'u812056030_mariage',
      entities: [Administrator, Invitee, User],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    // GuestsModule,
  ],
})
export class AppModule {}
