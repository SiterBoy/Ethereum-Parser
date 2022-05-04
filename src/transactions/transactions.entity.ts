import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column
  fromWallet: string;

  @Column
  toWallet: string;

  @Column
  block: number;

  @Column
  value: bigint;
}
