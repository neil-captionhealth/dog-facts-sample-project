import styled from '@emotion/styled';

import FavoritesButton from '../../atomic/FavoritesButton';
import { Dispatch, SetStateAction } from 'react';

import { IFactFavorites, IFact } from '../../../types/fact';
interface Props {
  fact: IFact;
  isFavorite: boolean;
  setFavorite:
    | Dispatch<SetStateAction<IFactFavorites>>
    | ((data: SetStateAction<IFactFavorites>) => void);
  fromPage?: number;
}
interface BoxProps {
  isFavorite: boolean;
}

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  background: #deeef7;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: ${(props) => (props.isFavorite ? '24px' : 0)};

  & > span {
    margin-bottom: 24px;
  }
`;

export const FactBox = ({ fact, setFavorite, isFavorite, fromPage }: Props) => {
  return (
    <Box isFavorite={isFavorite}>
      <span>{fact.fact}</span>
      <FavoritesButton
        fact={fact}
        isFavorite={isFavorite}
        setFavorite={setFavorite}
        fromPage={fromPage}
      />
    </Box>
  );
};
