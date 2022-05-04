import { forwardRef, Module } from '@nestjs/common';
import { HttpService } from 'src/lib/services';
import { TransactionModule } from '../transactions.module';
import { TransactionService } from '../transactions.service';
import { TaskService } from './tasks.service';

@Module({
  imports: [forwardRef(() => TransactionModule)],
  providers: [TaskService, TransactionService, HttpService],
  // Вопросики по импорту и провайдеру
})
export class TaskModule {}
