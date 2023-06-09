import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { UserStatusEnum } from './user.interface';
import * as argon2 from 'argon2';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name!: string;

  @Column({ nullable: false })
  last_name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  phone_number!: String;

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.INACTIVE })
  status!: UserStatusEnum;

  @Column({ nullable: false })
  password!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      throw new Error('Password is missing');
    }
    this.password = await argon2.hash(this.password);
  }

}
