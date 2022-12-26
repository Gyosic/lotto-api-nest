import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'mynums' })
export class MyNum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  nums: number[];

  @Column()
  createdAt: string;
}
