import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

import User from './User';

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  search: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.transactions)
  createdBy!: User;
}
