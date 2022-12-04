import { IFactFavorites } from '../../../../types/fact';

const favorites: IFactFavorites = {
  '1': {
    isFavorite: true,
    description:
      'All dogs can be traced back 40 million years ago to a weasel-like animal called the Miacis which dwelled in trees and dens. The Miacis later evolved into the Tomarctus, a direct forbear of the genus Canis, which includes the wolf and jackal as well as the dog.',
    fromPage: 1,
  },
  '4': {
    isFavorite: false,
    description:
      'Apple and pear seeds contain arsenic, which may be deadly to dogs.',
    fromPage: 1,
  },
  '7': {
    isFavorite: true,
    description:
      'In 2003, Dr. Roger Mugford invented the "wagometer", a device that claims to interpret a dog\'s exact mood by measuring the wag of its tail.',
    fromPage: 1,
  },
};

export { favorites };
