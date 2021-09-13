import faker from 'faker';
import { Product } from 'types';
import { CATEGORIES } from './constants';

function generateProducts(): Product {
  const name = faker.commerce.productName();
  const randomIdx = Math.round(CATEGORIES.length * Math.random());
  return {
    id: Math.round(104 * Math.random()).toString(),
    name,
    category: CATEGORIES[randomIdx],
    price: parseInt(faker.commerce.price(10, 300), 10),
    currency: 'USD',
    image: {
      src: faker.random.image(),
      alt: name,
    },
    bestseller: false,
    featured: false,
    details: {
      dimensions: {
        width: 1020,
        height: 1020,
      },
      size: 15000,
      description: faker.commerce.productDescription(),
      recommendations: [
        {
          src: faker.image.nightlife(),
          alt: faker.commerce.productName(),
        },
        {
          src: faker.image.abstract(),
          alt: faker.commerce.productName(),
        },
        {
          src: faker.image.nature(),
          alt: faker.commerce.productName(),
        },
      ],
    },
  };
}

export default generateProducts;
