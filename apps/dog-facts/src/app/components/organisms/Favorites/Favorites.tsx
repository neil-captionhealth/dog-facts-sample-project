import FactBox from '../../molecules/FactBox';

import { IFactFavorites } from '../../../app';

interface Props {
  favorites: IFactFavorites;
}

export const Favorites = ({ favorites }: Props) => {
  return (
    <>
      {/* {favorites.map(({ description }) => (
        <FactBox description={description} />
      ))} */}
    </>
  );
};
