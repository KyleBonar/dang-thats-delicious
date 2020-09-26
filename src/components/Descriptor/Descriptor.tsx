import * as React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
  font-family: FuturaMedium;
`;
StyledH2.displayName = "h2";

const StyledP = styled.p`
  font-family: AvenirNextReg;
`;
StyledP.displayName = "p";

export interface DescriptorProps {
  className?: string;
  children: string;
  title: string;
}

const Descriptor: React.FC<DescriptorProps> = props => {
  return (
    <div className={props.className}>
      <StyledH2>{props.title}</StyledH2>
      <StyledP>{props.children}</StyledP>
    </div>
  );
};

export default Descriptor;
