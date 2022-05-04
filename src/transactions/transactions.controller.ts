import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { TransactionService } from './transactions.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<string> {
    this.transactionService.create(createTransactionDto);
    return `Created!`;
  }

  @Get('')
  async getAll() {
    const result = await this.transactionService.getAll();
    console.log(result);
    return result;
  }
}
