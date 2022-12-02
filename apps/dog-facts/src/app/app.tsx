import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FavoritesFacts from './components/organisms/FavoritesFacts';

const queryClient = new QueryClient();

const StyledApp = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  max-width: 748px;
  padding: 56px 16px 16px;
  margin: auto;
`;

const App = () => {
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
      <QueryClientProvider client={queryClient}>
        <FavoritesFacts />
      </QueryClientProvider>
    </StyledApp>
  );
};

export { App };
