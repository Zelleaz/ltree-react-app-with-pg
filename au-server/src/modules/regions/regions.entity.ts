import { Entity, PrimaryGeneratedColumn, Column, ColumnType } from 'typeorm'

@Entity({ name: 'regions' }) 
export class Regions {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'ltree' })
  path: string 

  @Column()
  name: string 
}