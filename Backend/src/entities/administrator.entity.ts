import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('administrator')
export class Administrator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  password: string;

  @Column({ length: 14 })
  telephone: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  actual_name: string;

  @Column({ default: false, type: 'bit' })
  archived: boolean;
}
