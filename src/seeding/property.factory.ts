import { faker } from '@faker-js/faker';
import { Property } from '../entities/property.entity';
import { setSeederFactory } from 'typeorm-extension';
import { min } from 'class-validator';
import { max } from 'class-validator';

export const PropertyFactory = setSeederFactory(Property, () => {
  const property = new Property();
  property.name = faker.location.street();
  property.description = faker.lorem.sentence();
  property.price = +faker.commerce.price({min:1000, max:10000});
  

  return property;
});
