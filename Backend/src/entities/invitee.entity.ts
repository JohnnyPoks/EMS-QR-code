import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Administrator } from './administrator.entity';

@Entity('invitee')
export class Invitee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  actual_name: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  table_number: number;

  @Column()
  admin_ref: number;

  @Column({ length: 15, nullable: true })
  telephone: string;

  @Column({ default: false, type: 'bit' })
  archived: boolean;

  @Column({ default: false, type: 'bit' })
  present: boolean;

  @Column({ default: false, type: 'bit' })
  is_out: boolean;

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: 'admin_ref' })
  administrator: Administrator;
}
