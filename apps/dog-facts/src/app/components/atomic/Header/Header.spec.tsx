import { render } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header title="Dog facts" />);

    expect(baseElement).toBeTruthy();
  });
});
