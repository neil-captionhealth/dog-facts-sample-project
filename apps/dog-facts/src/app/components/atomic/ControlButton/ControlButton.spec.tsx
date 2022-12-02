import { render } from '@testing-library/react';

import ControlButton from './index';

describe('ControlButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ControlButton title="Next" />);
    expect(baseElement).toBeTruthy();
  });
});
