import { render } from '@testing-library/react';
import { Awesome, Props } from '.';

const props: Props = {
  // test props
};

describe('Awesome', () => {
  it('renders without errors', () => {
    const result = render(<Awesome {...props} />);

    expect(result.container.outerHTML).toRenderValidHTML();
  });
});
