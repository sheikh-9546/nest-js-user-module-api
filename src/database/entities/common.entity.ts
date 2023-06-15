 import { Exclude, Expose, Type } from 'class-transformer';
import { number } from 'joi';
import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
    @Column({ nullable: true,type:'bigint' })
    @Expose({ name: 'created_by' })
    public createdBy?: bigint;
  
    @Column({ nullable: true,type:'bigint' })
    @Expose({ name: 'updated_by' })
    public updatedBy?: bigint;
  
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Expose({ name: 'created_at'})
    public createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    @Expose({ name: 'updated_at' })
    public updatedAt!: Date;
  
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    @Expose({ name: 'deleted_at' })
    public deletedAt?: Date;

  }
  
