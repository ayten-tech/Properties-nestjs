import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './property-features.entity';
import { PropertyType } from './propertyType.entity';
import { join } from 'path';
import { User } from './user.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  //the cascade means when id gets updated in property entity, it will also update in property feature entity
  //there are so many options you can chose specifically in cascading types
  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true },
  )
  propertyFeature: PropertyFeature;

  //Many to one since many properties can belong to the same type
  //in Many to one , Join is always on Many side
  @ManyToOne(
    () => PropertyType,
    (propertyType) => propertyType.properties,
)
  @JoinColumn()
  propertyType: PropertyType

  @ManyToOne(() => User, (user) => user.properties)
  // join is optional if you want user id fk in table property , but if implemented must be on the Many side
  @JoinColumn({ name: 'propertyOwner' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedproperties)
  likedby: User[];

}
