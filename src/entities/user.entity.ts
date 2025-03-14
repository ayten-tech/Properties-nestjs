import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Property } from './property.entity';
  
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    email: string;
  
    @Column({ nullable: true })
    avatarUrl: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    password: string;
  

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[];

    @ManyToMany(() => Property, (property) => property.likedby)
    @JoinTable({ name: 'user_liked_properties' }) // Creates the junction table will display user entity as the first column
    likedproperties: Property[]; //name of relation 




}