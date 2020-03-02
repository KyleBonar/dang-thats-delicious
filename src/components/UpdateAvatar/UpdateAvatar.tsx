import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import shortid from "shortid";

import { AppState, MyThunkDispatch } from "../../redux/configureStore";
import { updateAvatar, logout } from "../../redux/users/actions";
import { IUserUpdateAvatar } from "../../redux/users/types";
import LogoSFYT from "../../images/icons/LogoSFYT";
import ArrowLeft from "../../images/icons/ArrowLeft";
import PageTitle from "../PageTitle/PageTitle";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { FlashMessage, FlashMessageProps } from "../FlashMessage/FlashMessage";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButtonHolder,
  StyledRadioButton,
  StyledAvatarImg
} from "./UpdateAvatarStyle";
import Auth from "../../utils/Auth/Auth";
import { API } from "../../utils/api/API";

export interface UpdateAvatarProps {}

const UpdateAvatar: React.SFC<UpdateAvatarProps> = props => {
  // assign state
  const [urls, setUrls] = React.useState<{ key: string; path: string }[]>([]);
  const selected = useSelector((store: AppState) => store.users.self.avatarURL);
  const displayName = useSelector(
    (store: AppState) => store.users.self.displayName
  );
  const [password, setPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });
  const [updatedAvatar, setUpdatedAvatar] = React.useState(selected);

  // assign router
  const router = useRouter();
  // assign dispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      router.push("/account/login?return=/account/update/avatar");
      return;
    }

    const getAvatarURLs = async () => {
      const strings: string[] = await API.image
        .getAvatarURLs({ user: { token } })
        .then(res => {
          return res.data.urls;
        })
        .catch(err => console.log(err));

      // Update state with urls
      setUrls(
        strings.map((str: string) => {
          return { key: shortid.generate(), path: str };
        })
      );
    };

    if (urls.length === 0) {
      getAvatarURLs();
    }
  }, []);

  return (
    <StyledDiv>
      <StyledLogoContainer>
        <Link to="/">
          <LogoSFYT />
        </Link>
      </StyledLogoContainer>
      <hr />
      <StyledArticle>
        <PageTitle>Update Avatar</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            {urls.map(url => {
              return (
                <StyledRadioButton
                  label={avatarImage(url.path)}
                  checked={url.path === updatedAvatar}
                  id={url.key}
                  name={"Avatar"}
                  key={url.key}
                  value={url.path}
                  onClick={e =>
                    setUpdatedAvatar((e.target as HTMLInputElement).value)
                  }
                />
              );
            })}
            <br />
            <br />
            <TextInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              disabled={false}
              showLabel={true}
              label={"Password"}
              name={"password"}
              value={password}
              required={true}
            />
            <StyledButtonHolder>
              <Link to="/account/settings">
                <Button type="button" displayType="outline">
                  <ArrowLeft /> Settings
                </Button>
              </Link>
              <Button type="submit">Update!</Button>
            </StyledButtonHolder>
          </form>

          {authorContribution()}
        </StyledFormContainer>
      </StyledArticle>
    </StyledDiv>
  );

  async function onSubmit(event: React.FormEvent): Promise<any> {
    // Prevent normal form submission
    event.preventDefault();

    if (!updatedAvatar) {
      setFlashMessage({
        isVisible: true,
        text: "You must select an avatar in order to update.",
        type: "warning"
      });
      window.scrollTo(0, 0); // Move screen to top
      return;
    }

    // Confirm password is longer than 8 characters
    if (password.length < 8) {
      setFlashMessage({
        isVisible: true,
        text:
          "Your password is too short! Password length must be at least 8 characters.",
        type: "warning"
      });
      window.scrollTo(0, 0); // Move screen to top
      return;
    }

    // Get token or else redirect
    const token = Auth.getToken();
    if (!token || !displayName) {
      router.push("/account/login?return=/account/settings/avatar");
      return;
    }

    // Construct data
    const data: IUserUpdateAvatar = {
      user: { token, password, avatarURL: updatedAvatar }
    };

    try {
      dispatch(
        updateAvatar({
          data,
          displayName
        })
      );

      // clear input and display flash
      setPassword("");
      setFlashMessage({
        isVisible: true,
        text: "Success! Display Name updated.",
        type: "success",
        slug: "/account/settings",
        slugText: "Back to Settings"
      });
      window.scrollTo(0, 0); // Move screen to top
    } catch (err) {
      // Account locked
      if (err.response.status === 403) {
        router.push("/account/login");
        return;
      }

      // Password bad or acc locked so going to reset
      // this.setState({
      //   ...this.state,
      //   password: "",
      //   flashMessage: {
      //     isVisible: true,
      //     text: err.response.data.msg,
      //     type: "warning"
      //   }
      // });
    }
  }

  function avatarImage(url: string): JSX.Element {
    return <StyledAvatarImg src={url} />;
  }

  function authorContribution(): JSX.Element {
    return (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{" "}
        is licensed by{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >
          {" "}
          CC 3.0 BY
        </a>
      </div>
    );
  }

  // const onRadioClick = (event: React.MouseEvent<HTMLInputElement>) => {
  //   if (!event || !event.target) {
  //     return;
  //   }

  //   const { id }: { id: string } = event.target as HTMLTextAreaElement;

  //   this.setState({
  //     ...this.state,
  //     selected: id,
  //     flashMessage: { isVisible: false }
  //   });
  // };
};

const mapState2Props = (state: AppState) => {
  return { user: state.users.self };
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  updateAvatar: ({
    data,
    displayName
  }: {
    data: IUserUpdateAvatar;
    displayName: string;
  }) => dispatch(updateAvatar({ data, displayName })),
  logout: () => dispatch(logout())
});

// export default connect(mapState2Props, mapDispatch2Props)(UpdateAvatar);
export default UpdateAvatar;
