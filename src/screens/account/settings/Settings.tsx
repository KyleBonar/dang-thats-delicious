import * as React from "react";
import { connect } from "react-redux";

import { Settings } from "../../../redux/users/actions";
import { ISettingsUser } from "../../../redux/users/types";
import LogoSFYT from "../../../images/icons/LogoSFYT";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link } from "../../../components/Link/Link";
import { AppState } from "../../../redux/configureStore";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledContainer,
  StyledButton,
  StyledGroup
} from "./SettingsStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../components/FlashMessage/FlashMessage";
import ArrowRight from "../../../images/icons/ArrowRight";
import ArrowLeft from "../../../images/icons/ArrowLeft";

export interface SettingsProps {
  Settings: any;
  history: { push: (location: string) => null };
}

export interface SettingsState {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  flashMessage: FlashMessageProps;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);

    // Init state
    this.state = {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      flashMessage: {
        isVisible: false
      }
    };
  }

  public render() {
    return (
      <StyledDiv>
        <StyledLogoContainer>
          <Link to="/">
            <LogoSFYT />
          </Link>
        </StyledLogoContainer>
        <hr />
        <StyledArticle>
          <PageTitle>Settings</PageTitle>
          <StyledContainer>
            <StyledGroup>
              <h4>Update email</h4>
              <Link to="/account/settings/email">
                <StyledButton type="button">
                  Update email <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Display Name</h4>
              <Link to="/account/settings/displayname">
                <StyledButton type="button">
                  Update Display Name <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Avatar</h4>
              <Link to="/account/settings/avatar">
                <StyledButton type="button">
                  Update Avatar <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Password</h4>
              <Link to="/account/settings/password">
                <StyledButton type="button">
                  Update Password <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <Link to="/">
              <StyledButton type="button" displayType="outline">
                <ArrowLeft /> Return Home
              </StyledButton>
            </Link>
          </StyledContainer>
        </StyledArticle>
      </StyledDiv>
    );
  }
}

const mapState2Props = (state: AppState) => {
  return {};
};

const mapDispatch2Props = {};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Settings);
