import styled from '@emotion/styled';

interface Props {
  title: string;
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
`;

export const Header = ({ title }: Props) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
  );
};
