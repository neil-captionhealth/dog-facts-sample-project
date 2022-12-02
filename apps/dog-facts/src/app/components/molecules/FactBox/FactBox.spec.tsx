import { render } from '@testing-library/react';

import FactBox from './index';

describe('FactBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FactBox />);

    expect(baseElement).toBeTruthy();
  });
});
