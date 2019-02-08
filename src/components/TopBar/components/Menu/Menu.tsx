import * as React from "react";
import { connect } from "react-redux";

import styled from "../../../../theme/styled-components";
import { IinitialState } from "../../../../redux/configureStore";
import Profile from "./components/Profile/Profile";

const StyledUL = styled.ul`
  max-height: calc(100vh - 52px - 16px);
  overflow-y: auto;
  width: 275px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.theme.white};
  list-style: none;
  padding: 0;
`;

export interface MenuProps {}

class Menu extends React.Component<MenuProps, any> {
  public render() {
    return (
      <StyledUL>
        <li>
          <Profile />
        </li>
        <li>something2</li>
        <li>something3</li>
      </StyledUL>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(Menu);
