import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { UserStatusEnum } from './user.interface';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: String;

  @Column()
  status: UserStatusEnum;

  @Column()
   password: string;



  @BeforeInsert()
      hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
      }
}
