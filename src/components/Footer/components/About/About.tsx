import * as React from "react";

import styled from "../../../../theme/styled-components";

const StyledDiv = styled.div`
  max-width: ${props => props.theme.footerMaxWidth};
`;

const StyledH5 = styled.h5`
  margin: 0.5em 0;
  font-weight: 400;
  padding: 0;
  text-transform: uppercase;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.scaleH5};
`;

const StyledP = styled.p`
  margin: 0.5em 0;
  padding: 0;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.scaleP};
`;

interface TypesProps {
  className?: string;
}

const Types: React.SFC<TypesProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <StyledH5>About</StyledH5>

      <StyledP>Text here</StyledP>
    </StyledDiv>
  );
};

export default Types;
