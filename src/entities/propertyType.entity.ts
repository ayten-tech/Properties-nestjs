import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class PropertyType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @OneToMany(() => Property, (Property) => Property.propertyType)
    properties: Property
}