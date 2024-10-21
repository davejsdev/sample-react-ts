import { styled } from '@linaria/react';

const StyledAwesome = styled.div`
  /* styles */
`;

export type Props = {
  // props
};

const Awesome = (props: Props) => {
  return (
    <StyledAwesome {...props}>
      Here is you new Awesome component!
    </StyledAwesome>
  );
};

export default Awesome;
