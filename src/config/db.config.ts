import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { PropertyFeature } from 'src/entities/property-features.entity';
import { PropertyType } from 'src/entities/propertyType.entity';

//variable its securly stored in .env file
//enviroment variable are loaded into configuratioon using the dotenv package
dotenv.config();
export const pgConfig: PostgresConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: "postgres",
  synchronize: true,
  port: 5432,
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  // entities: [Property, PropertyType,PropertyFeature],
};

// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import * as dotenv from 'dotenv';
// import { PropertyFeature } from 'src/entities/property-features.entity';
// import { PropertyType } from 'src/entities/propertyType.entity';
// import { DataSource } from 'typeorm';
// import { User } from 'src/entities/user.entity';
// //variable its securly stored in .env file
// //enviroment variable are loaded into configuratioon using the dotenv package
// dotenv.config();
// export const pgConfig: PostgresConnectionOptions = {
//   url: process.env.DATABASE_URL,
//   type: "postgres",
//   synchronize: true,
//   port: 5432,
//   entities: [__dirname + '/../entities/*.entity.{js,ts}'],
//   migrations: ['src/migrations/*.ts'],

// };


