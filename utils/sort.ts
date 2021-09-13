import { Product } from 'types';

export const sortAlphabetically = (arr: Product[]) => {
  return arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const sortByPrice = (arr: Product[]) => {
  return arr.sort((a, b) => a.price - b.price);
};
