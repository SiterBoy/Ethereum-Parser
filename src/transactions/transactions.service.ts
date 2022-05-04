import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionService {
  constructor(private sequelize: Sequelize) {}

  async create(transactionDto: CreateTransactionDto) {
    try {
      await Transaction.create({ ...transactionDto });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const response = await this.sequelize.query(
        `
        WITH lastBlocks as 
        (
          SELECT * FROM "Transactions" 
          WHERE block IN 
              (SELECT DISTINCT block FROM "Transactions" ORDER BY block DESC LIMIT 100)
        ),
        allwallets as 
        (
            SELECT "fromWallet" wallet, "value" 
            FROM lastBlocks
            UNION ALL
            SELECT "toWallet", "value"
            FROM lastBlocks
        ) 
          SELECT wallet, sum(value)
            FROM allwallets
            GROUP BY wallet
            ORDER BY sum DESC
            LIMIT 1`,
      );
      return response[0];
    } catch (error) {
      console.log(error);
    }
  }
}
