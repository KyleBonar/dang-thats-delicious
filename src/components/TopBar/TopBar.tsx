import * as React from "react";
import { Link } from "../Link/Link";
import { connect } from "react-redux";

import styled from "../../theme/styled-components";
import { Dropdown, Trigger, Body } from "./components/Dropdown/Dropdown";
import { AppState } from "../../redux/configureStore";
import Menu from "./components/Menu/Menu";

// SVG icons
import UserIcon from "../../images/icons/UserIcon";
import LoginIcon from "../../images/icons/LoginIcon";
import ChevronDown from "../../images/icons/ChevronDown";

const StyledDiv = styled.div`
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 0.5em 0em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 2em;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${x => x.theme.primaryThemeColor};
    fill: ${x => x.theme.primaryThemeColor};
  }
`;

const StyledDropDown = styled(Dropdown)`
  margin-right: 2em;
`;

const StyledTrigger = styled(Trigger)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: FuturaMedium;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${x => x.theme.primaryThemeColor};
    fill: ${x => x.theme.primaryThemeColor};
  }
`;

const StyledBody = styled(Body)`
  right: 0;
`;

export interface TopBarProps {
  isLoggedIn?: boolean;
  displayName?: string;
}

const TopBar: React.SFC<TopBarProps> = props => {
  return (
    <div>
      {props.isLoggedIn ? (
        <StyledDiv>
          <StyledDropDown>
            <StyledTrigger>
              <ChevronDown />
              {props.displayName}
            </StyledTrigger>
            <StyledBody>
              <Menu />
            </StyledBody>
          </StyledDropDown>
        </StyledDiv>
      ) : (
        <StyledDiv>
          <StyledLink to="/account/register">
            <UserIcon />
            Register
          </StyledLink>
          <StyledLink to="/login">
            <LoginIcon />
            Log in
          </StyledLink>
        </StyledDiv>
      )}
    </div>
  );
};
TopBar.defaultProps = {
  isLoggedIn: false
};

const mapState2Props = (state: AppState) => {
  return {
    isLoggedIn: !!state.users.self.token, // will be bool
    displayName: state.users.self.displayName
  };
};

const mapDispatch2Props = {};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(TopBar);
