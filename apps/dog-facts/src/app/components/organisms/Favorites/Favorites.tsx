import { SetStateAction } from 'react';

import styled from '@emotion/styled';

import FactBox from '../../molecules/FactBox';

import { IFactFavorites } from '../../../types/fact';

interface Props {
  favorites: IFactFavorites;
  setFavorite: (data: SetStateAction<IFactFavorites>) => void;
}

const Box = styled.div`
  max-width: 390px;
  margin-top: 48px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Favorites = ({ favorites, setFavorite }: Props) => {
  const areFavoritesEmpty = Object.keys(favorites).every(
    (key) => !favorites[key].isFavorite
  );

  return (
    <Box>
      <h1>Favorites</h1>
      {areFavoritesEmpty && (
        <p data-testid="favoritesEmptyLabel">
          You don't have any favorites yet!{' '}
          <span role="img" aria-label="emoji">
            &#129325;
          </span>
        </p>
      )}
      {Object.keys(favorites).map((id) => {
        const description = favorites[id].description;
        const currentFactAdapter = {
          id: Number(id),
          fact: description,
          length: description.length,
        };

        if (!favorites[id].isFavorite) {
          return null;
        }

        return (
          <FactBox
            key={id}
            fact={currentFactAdapter}
            isFavorite
            setFavorite={setFavorite}
          />
        );
      })}
    </Box>
  );
};
