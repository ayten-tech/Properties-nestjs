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
  import * as bcrypt from 'bcryptjs';
  import { Role } from 'src/auth/enums/role.enum';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false }) // Ensure it's required (or use `nullable: true` if optional)
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    email: string;

    @Column({
      type: 'enum',
      enum: Role,
      default: Role.USER,
    })
    role: Role;
  
    @Column({ nullable: true })
    avatarUrl: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    password: string;

    @Column({ type: 'text', nullable: true }) // Ensures database allows NULL
    hashedRefreshToken?: string | null;
    // Stores hashed refresh token

  

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[];

    @ManyToMany(() => Property, (property) => property.likedby)
    @JoinTable({ name: 'user_liked_properties' }) // Creates the junction table will display user entity as the first column
    likedproperties: Property[]; //name of relation 

    //beforeinsert : converts string password to hash format before storing it to databse for security
    @BeforeInsert()
    async hashPassword() { 
      //saltrouds are iterations ,where there are several computations for genrating hashing
    const saltRounds = 10; // Secure and balanced , more is more secure but slower, less is less secure but faster
    this.password = await bcrypt.hash(this.password, saltRounds);
  }


}