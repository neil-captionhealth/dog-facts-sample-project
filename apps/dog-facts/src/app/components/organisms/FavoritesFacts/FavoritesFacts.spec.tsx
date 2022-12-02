import { render } from '@testing-library/react';

import FavoritesButton from './index';

describe('FavoritesButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FavoritesButton title="Add to favorites" />
    );
    expect(baseElement).toBeTruthy();
  });
});
