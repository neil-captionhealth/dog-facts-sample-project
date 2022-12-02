import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import Header from './components/atomic/Header';

import Facts from './components/organisms/Facts';
// import Favorites from './components/organisms/Favorites';

import { createContext, useState, Dispatch, SetStateAction } from 'react';

const StyledApp = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  max-width: 748px;
  padding: 56px 16px 16px;
  margin: auto;
`;

export interface IFactFavorites {
  [id: number]: {
    isFavorite: boolean;
  };
}

// export type FavoritesContext = {
//   favorites: IFactFavorite[];
//   setFavorite: Dispatch<SetStateAction<string[]>>;
// } | null;

// const FavoritesContext = createContext<FavoritesContext>(null);

const App = () => {
  const [favorites, setFavorite] = useState<IFactFavorites>([]);

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
      <Facts favorites={favorites} setFavorite={setFavorite} />
      {/* <Favorites favorites={favorites} setFavorite={setFavorite} /> */}
    </StyledApp>
  );
};

export { App };
