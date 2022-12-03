import { Dispatch, SetStateAction } from 'react';

import styled from '@emotion/styled';

import FactBox from '../../molecules/FactBox';

import { IFactFavorites, IFact } from '../../../types/fact';

interface Props {
  favorites: IFactFavorites;
  facts?: IFact[];
  setFavorite: Dispatch<SetStateAction<IFactFavorites>>;
  fromPage: number;
}

const Box = styled.div`
  max-width: 390px;
  margin-top: 48px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Favorites = ({
  favorites,
  facts = [],
  setFavorite,
  fromPage,
}: Props) => {
  const areFavoritesEmpty = Object.keys(favorites).every(
    (key) => !favorites[key].isFavorite
  );

  return (
    <Box>
      <h1>Favorites</h1>
      {areFavoritesEmpty && (
        <p>
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
            fromPage={fromPage}
          />
        );
      })}
    </Box>
  );
};
