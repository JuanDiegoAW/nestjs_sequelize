import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey, addHook } from 'sequelize-typescript';
import { Phone } from '../phones/phone.entity';

@Table
export class Customer extends Model<Customer> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  observations: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;

  @HasMany(() => Phone, {foreignKey: 'phoneable_id', constraints: false, scope: { phoneable_type: 'customer' }})
  phones: Phone[];
}