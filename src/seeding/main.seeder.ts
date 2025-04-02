import { faker } from '@faker-js/faker';
import { Property } from '../entities/property.entity';
// import { PropertyFeatureFactory } from "./propertyFeature.factory";
// import { PropertyFactory } from "./property.factory";
import { PropertyType } from '../entities/propertyType.entity';
import { User } from '../entities/user.entity';
import {PropertyFeature} from '../entities/property-features.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
//inside this we wil use factories we've just created for creating some tests instances of our entities and then we insert them in the database
//sedder run outside our nest js project (has different runing script that doesn't include npm run dev) that's why we don't use injectable
export class MainSeeder implements Seeder {

  //this method will be called when we run the seed command
  //dataasource for property type entity with no factory established(data is entered manually), factory manager with entities that have factories established(random data generated)
  //given that users, property features and property types are foreign keys in table properties, we will have to insert recoords in the main tables first before inserting their reference values in table properties 
  public async run( dataSource:DataSource,factoryManager: SeederFactoryManager): 
  Promise<void> {
    const typeRepo = dataSource.getRepository(PropertyType);
    console.log("seeding Property types manually without refactoring....")
    const propertyTypes = await typeRepo.save([
      { value: "Apartment" },
      { value: "House" },]);
   
      //creating instances of our factories
    const userFactory = factoryManager.get(User);
    console.log("seeding users....")
    //creating instances of our entities
    const users = await userFactory.saveMany(5); //insert 5 users
    
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);
    console.log("seeding Property features....")
    const propertyFeatures = await propertyFeatureFactory.saveMany(10); //comment this if using approach b
    
    const propertyFactory = factoryManager.get(Property);
    //after inserting values of the main tables, we can now insert the reference values in table properties
    //Generates an instance of Property but does not save it to the database.
    // Create properties with faker data
const properties = await Promise.all(
  Array(5)
    .fill('')
    .map(async () => {
      const property = await propertyFactory.make({
        //Assigns a random user from the users array that we assigned randomly 
        user: faker.helpers.arrayElement(users),
        // Assigns a random property type from propertyTypes that we assigned randomly
        propertyType: faker.helpers.arrayElement(propertyTypes),
        // Assigns a random property feature from propertyFeatures that we assigned randomly When you want to randomly assign from an existing set of features to avoid duplicates.
        propertyFeature: faker.helpers.arrayElement(propertyFeatures), //approach a 
        //the follwing creates new entity every time , when you need to When you need unique property features for every property.(in our case it's better to use this approach since property feature should be unique to every property but we will use the previous approach for fascility)
        // propertyFeature: await propertyFeatureFactory.save(), //approach b 
        //if you'll use approach b comment in this file line const propertyFeatures = await propertyFeatureFactory.saveMany(10);
        price: faker.number.int({ min: 1000, max: 10000 }), // Ensures an integer
      });
      return property;
    }),
);
//Retrieves the TypeORM repository for the Property entity without this line 
//await propertyRepo.save(properties); will throw error 
const propertyRepo = dataSource.getRepository(Property);
await propertyRepo.save(properties);
console.log("seeding properties refrencing the main tables....")

  }
}