import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Administrator } from './administrator.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ length: 14 })
  telephone: string;

  @Column({ length: 100 })
  actual_name: string;

  @Column()
  admin_ref: number;

  @Column({ default: false, type: 'bit' })
  password_modified: boolean;

  @Column({ default: false, type: 'bit' })
  archived: boolean;

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: 'admin_ref' })
  administrator: Administrator;
}
