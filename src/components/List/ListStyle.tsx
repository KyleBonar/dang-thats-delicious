import styled from "../../theme/styled-components";
import { Link } from "../Link/Link";

export const StyledDiv = styled.div`
  padding: 10px;
`;
StyledDiv.displayName = "div";

export const StyledH5 = styled.h5`
  margin: 0 0 0.5em 0;
  font-weight: 400;
  padding: 0;
  text-transform: uppercase;
  font-size: ${props => props.theme.scaleH5};
`;
StyledH5.displayName = "h5";

export const StyledUl = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;

  li {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    padding-left: 0.75rem;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    li {
      padding-left: 0;
    }
  }
`;
StyledUl.displayName = "ul";
