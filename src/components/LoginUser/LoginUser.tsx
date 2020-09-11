import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import validator from "validator";

import { login } from "../../redux/users/actions";
import { ILoginUser } from "../../redux/users/types";
import { AppState } from "../../redux/configureStore";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import { Link } from "../Link/Link";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import {
  StyledFormContainer,
  StyledButton,
  StyledText,
  StyledFooterDivs
} from "./LoginUserStyle";

export interface LoginProps {}

const LoginUser: React.FC<LoginProps> = () => {
  // assign state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false,
    text: "",
    type: undefined
  });

  // assign dispatch
  const dispatch = useDispatch();
  // assign NextJS router
  const router = useRouter();

  // Grab token from redux
  const token = useSelector((store: AppState) => store.users.self.token);

  React.useEffect(() => {
    if (!token) return;

    // Redirect user to where they were or to sauces page
    if (router.query.return && !Array.isArray(router.query.return)) {
      router.push(`${router.query.return}`);
    } else {
      router.push("/sauces");
    }
  }, [token]);

  return (
    <>
      <PageTitle>Login</PageTitle>
      <StyledFormContainer>
        {flashMessage.isVisible && (
          <FlashMessage type={flashMessage.type} isVisible>
            {flashMessage.text}
          </FlashMessage>
        )}
        <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
          <TextInput
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            showLabel={true}
            label={"Email"}
            name={"email"}
            required={true}
          />
          <TextInput
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            showLabel={true}
            label={"Password"}
            name={"password"}
            required={true}
          />
          <StyledFooterDivs>
            <StyledButton type="submit">Login</StyledButton>
          </StyledFooterDivs>
          <StyledText>
            <Link href="/account/reset/password">Forgot your password?</Link>
          </StyledText>

          <StyledText>
            Don't have an account yet?{" "}
            <Link href="/account/register">Sign up!</Link>
          </StyledText>
        </form>
      </StyledFormContainer>
    </>
  );

  async function onSubmit(event: React.FormEvent): Promise<any> {
    event.preventDefault();

    // If not email don't even send network request
    if (!validator.isEmail(email)) {
      setFlashMessage({
        isVisible: true,
        text: "An email must be used.",
        type: "alert"
      });
      return;
    }

    // If password too short, don't send network request
    if (password.length < 8) {
      setFlashMessage({
        isVisible: true,
        text: "Password must be longer than 8 characters",
        type: "alert"
      });
      return;
    }

    const credentials: ILoginUser = {
      user: { email, password }
    };
    try {
      // dispatch action which calls API to login user
      await dispatch(login({ credentials }));
    } catch (err) {
      // Create warning flash
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "warning"
      });

      // reset form
      setEmail("");
      setPassword("");
    }
  }
};

export default LoginUser;
