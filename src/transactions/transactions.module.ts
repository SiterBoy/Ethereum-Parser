import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModule } from './tasks/tasks.module';
import { TransactionController } from './transactions.controller';
import { Transaction } from './transactions.entity';
import { TransactionService } from './transactions.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    ScheduleModule.forRoot(),
    TaskModule,
  ],
  controllers: [TransactionController],
  exports: [TransactionService],
  providers: [TransactionService],
})
export class TransactionModule {}
