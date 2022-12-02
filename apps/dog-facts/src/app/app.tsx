import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import Header from './components/atomic/Header';

import Facts from './components/organisms/Facts';
import Favorites from './components/organisms/Favorites';

import { useState, useMemo } from 'react';

const StyledApp = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  max-width: 748px;
  padding: 56px 16px 16px;
  margin: auto;
`;

export interface IFactFavorites {
  [id: number | string]: {
    isFavorite: boolean;
  };
}
export interface IFact {
  id: number;
  description: string;
}

const mockedData = [
  {
    id: 0,
    description:
      'All dogs can be traced back 40 million years ago to a weasel-like animal called the Miacis which dwelled in trees and dens. The Miacis later evolved into the Tomarctus, a direct forbear of the genus Canis, which includes the wolf and jackal as well as the dog.',
  },
  {
    id: 1,
    description:
      'Ancient Egyptians revered their dogs. When a pet dog would die, the owners shaved off their eyebrows, smeared mud in their hair, and mourned aloud for days.',
  },
];

const App = () => {
  const [facts, setFacts] = useState<IFact[]>(mockedData);
  const [favorites, setFavorite] = useState<IFactFavorites>({});

  const nonFavoriteFacts = useMemo(
    () => facts.filter((fact) => !favorites[fact.id]?.isFavorite),
    [facts, favorites]
  );

  return (
    <StyledApp>
      <Global
        styles={css`
          body {
            margin: 0;
            font-size: 18px;
          }
        `}
      />
      <Header title="Dog Facts" />
      <Facts setFavorite={setFavorite} facts={nonFavoriteFacts} />
      <Favorites
        favorites={favorites}
        setFavorite={setFavorite}
        facts={facts}
      />
    </StyledApp>
  );
};

export { App };
