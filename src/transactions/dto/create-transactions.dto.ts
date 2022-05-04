export class CreateTransactionDto {
  readonly fromWallet: string;
  readonly toWallet: string;
  readonly value: number;
  readonly block: number;
}
