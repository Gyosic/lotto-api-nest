import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'nums' })
export class Num {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drwtNo1: number;

  @Column()
  drwtNo2: number;

  @Column()
  drwtNo3: number;

  @Column()
  drwtNo4: number;

  @Column()
  drwtNo5: number;

  @Column()
  drwtNo6: number;

  @Column()
  bnusNo: number;

  @Column()
  drwNo: number;

  @Column()
  drwNoDate: string;

  @Column({ type: 'bigint' })
  totSellamnt: number;

  @Column({ type: 'bigint' })
  firstWinamnt: number;

  @Column({ type: 'bigint' })
  firstPrzwnerCo: number;

  @Column({ type: 'bigint' })
  firstAccumamnt: number;

  @Column()
  returnValue: string;
}
