import styled from '@emotion/styled';
import FilledFavoriteStar from './../../../../assets/filled-star.svg';
import EmptyFavoriteStar from './../../../../assets/empty-star.svg';

import { IFactFavorites } from '../../../app';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  setFavorite: Dispatch<SetStateAction<IFactFavorites>>;
  isFavorite: boolean;
  factId: number;
}

const Button = styled.button`
  border: none;
  padding: 0;
  background: initial;
  height: 24px;
  display: flex;
  align-items: center;

  & > span {
    font-size: 18px;
  }
`;
const Icon = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
`;

export const FavoritesButton = ({ setFavorite, isFavorite, factId }: Props) => {
  return (
    <Button
      onClick={() =>
        setFavorite((prevState) => {
          return {
            ...prevState,
            [factId]: {
              isFavorite: !prevState[factId]?.isFavorite ?? true,
            },
          };
        })
      }
    >
      <Icon
        src={isFavorite ? FilledFavoriteStar : EmptyFavoriteStar}
        alt="star icon"
      />
      <span>{`${isFavorite ? 'Remove from' : 'Add to'} Favorites`}</span>
    </Button>
  );
};
