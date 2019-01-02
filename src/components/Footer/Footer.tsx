import * as React from "react";

import styled from "../../theme/styled-components";
import Navigation from "./components/Navigation/Navigation";
import Peppers from "./components/Peppers/Peppers";
import Types from "./components/Types/Types";
import About from "./components/About/About";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.primaryThemeColor};
`;

const StyledDiv = styled.div`
  max-width: ${props => props.theme.maxPageWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    // width: 33%;
    box-sizing: border-box;
    padding: 0 1em;
  }
`;

interface FooterProps {}

const Footer: React.SFC<FooterProps> = props => {
  return (
    <StyledFooter>
      <StyledDiv>
        <Navigation />
        {/* <Peppers /> */}
        <Types />
        <About />
      </StyledDiv>
    </StyledFooter>
  );
};

export default Footer;
