import styled from '@emotion/styled';

interface Props {
  title: string;
  handleClick: () => void;
}

const StyledButton = styled('button')`
  background: #eae8e8;
  border-radius: 20px;
  width: 108px;
  height: 40px;
  border: none;
`;

export const ControlButton = ({ title, handleClick }: Props) => {
  return <StyledButton onClick={handleClick}>{title}</StyledButton>;
};
