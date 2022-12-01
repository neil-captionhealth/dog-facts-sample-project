import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ComponentProps {}

const StyledComponent = styled.div`
  color: pink;
`;

export function Component(props: ComponentProps) {
  return (
    <StyledComponent>
      <h1>Welcome to Component!</h1>
    </StyledComponent>
  );
}

export default Component;
