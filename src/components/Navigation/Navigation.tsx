import * as React from "react";
import Link from "next/link";

import LogoSFYT from "../../images/icons/LogoSFYT";
import Bar from "../../images/icons/Bar";
import { Header, StyledButton, StyledUl, StyledLink } from "./NavigationStyle";

export interface NavigationState {
  isOpen: boolean;
}

class Navigation extends React.PureComponent<{}, NavigationState> {
  public constructor(props: any) {
    super(props);

    this.state = { isOpen: false };
  }

  public render() {
    return (
      <Header>
        <Link href="/">
          <a>
            <LogoSFYT />
          </a>
        </Link>
        <StyledButton onClick={this.toggleMenu}>
          <Bar />
        </StyledButton>
        <StyledUl
          style={{
            maxHeight: this.state.isOpen ? "99999px" : "0",
            display: this.state.isOpen ? "flex" : "none"
          }}
        >
          <li>
            <StyledLink href="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink href="/sauces">Sauces</StyledLink>
          </li>
          <li>
            <StyledLink href="/sauce/add">Add Sauce</StyledLink>
          </li>
          {/* <li>
            <span>icon here</span>
          </li> */}
        </StyledUl>
      </Header>
    );
  }

  public toggleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const isOpen: boolean = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  };
}

export default Navigation;
