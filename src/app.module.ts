import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionModule } from './transactions/transactions.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ethereum-app',
      autoLoadModels: true,
      synchronize: true,
    }),
    TransactionModule,
  ],
})
export class AppModule {}
