import { faker } from '@faker-js/faker';
import { PropertyFeature } from '../entities/property-features.entity';
import { setSeederFactory } from 'typeorm-extension';
import { min } from 'class-validator';
import { max } from 'class-validator';

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, () => {
  const feature = new PropertyFeature();
  feature.area = faker.number.int({min: 25, max: 500});
  feature.bedrooms = faker.number.int({min: 1, max: 5});
  feature.bathrooms = faker.number.int({min: 1, max: 3});
  feature.parkingSpots = faker.number.int({min: 1, max: 3});
  feature.hasBalcony = faker.datatype.boolean();
  feature.hasGardenYard = faker.datatype.boolean();
  feature.hasSwimmingPool = faker.datatype.boolean();
  

  return feature;
});
