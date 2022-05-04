import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from 'src/lib/services';
import { TransactionService } from '../transactions.service';
import { BlockEthereum, LastBlockEthereum } from './types';

@Injectable()
export class TaskService implements OnModuleInit {
  async onModuleInit() {
    console.log('Started parsing data');
    // await this.getLastBlock();
    await this.parseTransactions();
    console.log('Finised parsing data');
  }

  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  firstBlock = 14580000;
  lastBlock = 14580020;
  lastParsedBlock = 0;
  apiKey = 'BMRRJ2DZWZQ3PPX1XPIYQQDZFJ2K9IFX1A';
  isAllLoaded = false;
  apiUrl = 'https://api.etherscan.io/api?module=proxy';

  @Cron('*/8 * * * * *')
  async getLastBlock() {
    try {
      const data = await this.httpService.request<LastBlockEthereum>(
        `${this.apiUrl}&action=eth_blockNumber&apikey=${this.apiKey}`,
      );
      this.lastBlock = parseInt(data.result);

      //if parsing ended and lastBlock was changed - save data to database
      if (this.isAllLoaded && this.lastParsedBlock !== this.lastBlock) {
        console.log(`Cron. Parsing block with number: ${this.lastBlock}`);
        const { data, blockNumber } = await this.parseOneTransaction(
          this.lastBlock,
        );
        const {
          result: { transactions },
        } = data;
        if (transactions.length > 0) {
          this.saveTransactionToDb(transactions, blockNumber);
          this.lastParsedBlock = this.lastBlock;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  saveTransactionToDb(transactions, blockNumber) {
    transactions?.forEach((transaction) =>
      this.transactionService.create({
        fromWallet: transaction.from,
        toWallet: transaction.to,
        value: parseInt(transaction.value, 16),
        block: blockNumber,
      }),
    );
  }

  async parseTransactions() {
    let currentBlock = this.firstBlock;
    while (currentBlock <= this.lastBlock) {
      const { data, blockNumber } = await this.parseOneTransaction(
        currentBlock,
      );
      const transactions = data.result.transactions;

      this.saveTransactionToDb(transactions, blockNumber);

      currentBlock += 1;
    }
    this.isAllLoaded = true;
  }

  async parseOneTransaction(blockNumber: number) {
    const hexBlock: string = blockNumber.toString(16);
    try {
      const data = await this.httpService.request<BlockEthereum>(
        `${this.apiUrl}&action=eth_getBlockByNumber&tag=${hexBlock}&boolean=true&apikey=${this.apiKey}`,
      );
      return { data, blockNumber };
    } catch (error) {
      console.log(error);
    }
  }
}
