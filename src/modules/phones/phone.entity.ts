import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';

@Table
export class Phone extends Model<Phone> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @Column({
    type: DataType.ENUM,
    values: ['mobile', 'home', 'office', 'other'],
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  phoneable_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneable_type: string;

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
}