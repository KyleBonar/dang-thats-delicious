import * as React from "react";
import { Link } from "../Link/Link";
import { connect } from "react-redux";

import styled from "../../theme/styled-components";

// SVG icons
import UserIcon from "../../images/icons/UserIcon";
import LoginIcon from "../../images/icons/LoginIcon";
import { IinitialState } from "../../redux/configureStore";

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

export interface TopBarProps {
  isLoggedIn?: boolean;
}

const TopBar: React.SFC<TopBarProps> = props => {
  return (
    <div>
      {props.isLoggedIn ? (
        <StyledDiv>
          <StyledLink to="/login">
            <LoginIcon />
            Log in
          </StyledLink>
        </StyledDiv>
      ) : (
        <StyledDiv>
          <StyledLink to="/register">
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

const mapState2Props = (state: IinitialState) => {
  return { isLoggedIn: !!state.users.self.token };
};

const mapDispatch2Props = {};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(TopBar);
