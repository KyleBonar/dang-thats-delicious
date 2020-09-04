import * as React from "react";
import { useSelector } from "react-redux";

import styled from "../../../../theme/styled-components";
import { AppState } from "../../../../redux/configureStore";
import ProfileMenuItem from "./components/ProfileMenuItem/ProfileMenuItem";
import AccountMenuItem from "./components/AccountMenuItem/AccountMenuItem";
import HelpMenuItem from "./components/HelpMenuItem/HelpMenuItem";
import AdminMenuItem from "./components/AdminMenuItem/AdminMenuItem";
import Item from "./components/Item/Item";

const StyledUL = styled.ul`
  max-height: calc(100vh - 52px - 16px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 275px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.theme.white};
  list-style: none;
  padding: 0;
  line-height: initial;
`;

export interface MenuProps {}

const Menu: React.SFC<MenuProps> = props => {
  const isAdmin = useSelector((store: AppState) => store.users.self.isAdmin);

  return (
    <StyledUL>
      <li>
        <ProfileMenuItem />
      </li>
      <li>
        <AccountMenuItem />
      </li>
      <li>
        <HelpMenuItem />
      </li>
      {isAdmin && (
        <li>
          <AdminMenuItem />
        </li>
      )}
      <hr style={{ margin: 0 }} />
      <Item to="/account/logout">Logout</Item>
    </StyledUL>
  );
};

export default Menu;
