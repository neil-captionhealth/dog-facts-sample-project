import styled from '@emotion/styled';

import FavoritesButton from '../../atomic/FavoritesButton';
import { Dispatch, SetStateAction } from 'react';

import { IFactFavorites } from '../../../app';
import { IFact } from '../../organisms/Facts';

interface Props {
  fact: IFact;
  isFavorite: boolean;
  setFavorite: Dispatch<SetStateAction<IFactFavorites>>;
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background: #deeef7;
  border-radius: 24px;
  padding: 24px;

  & > span {
    margin-bottom: 24px;
  }
`;

export const FactBox = ({
  fact: { description, id },
  setFavorite,
  isFavorite,
}: Props) => {
  return (
    <Box>
      <span>{description}</span>
      <FavoritesButton
        isFavorite={isFavorite}
        setFavorite={setFavorite}
        factId={id}
      />
    </Box>
  );
};
