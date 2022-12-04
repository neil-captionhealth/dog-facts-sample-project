import { render, screen } from '@testing-library/react';
import { SetStateAction } from 'react';

import { IFactFavorites } from '../../../../types/fact';

import '@testing-library/jest-dom';

import { favorites } from './mocks';

import Favorites from '../index';

describe('FavoritesButton', () => {
  const setFavorite: (data: SetStateAction<IFactFavorites>) => void = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement, asFragment } = render(
      <Favorites favorites={favorites} setFavorite={setFavorite} />
    );
    expect(baseElement).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render empty label in case no favorites added', () => {
    render(<Favorites favorites={{}} setFavorite={setFavorite} />);

    expect(screen.getByTestId('favoritesEmptyLabel')).toBeInTheDocument();
  });

  it('should call setFavorite to unfavorite element', () => {
    render(<Favorites favorites={favorites} setFavorite={setFavorite} />);

    screen.getAllByTestId('handleFavoriteButton')[0].click();

    expect(setFavorite).toBeCalledTimes(1);
    expect(setFavorite).toBeCalledWith(expect.any(Function));
  });

  it('should render a filled icon', () => {
    render(<Favorites favorites={favorites} setFavorite={setFavorite} />);

    const icon: Partial<HTMLImageElement> =
      screen.getAllByTestId('favoriteIcon')[0];

    expect(icon.src).toMatch(/filled-star.svg/);
  });
});
