import * as React from "react";
import { connect } from "react-redux";

import {
  StyledLink,
  StyledHead,
  StyledImage,
  StyledFoot
} from "./ProfileStyle";
import { Button } from "../../../../../Button/Button";
import { IinitialState } from "../../../../../../redux/configureStore";

interface ProfileProps {
  displayName?: string;
  avatar?: string;
}

class Profile extends React.PureComponent<ProfileProps, any> {
  public render() {
    return (
      <StyledLink href="#PathToProfile">
        <StyledHead>
          <div>
            <StyledImage
              src={
                this.props.avatar ||
                "https://images.catsolonline.com/cache/uzyl82mxhzrvloeffavq-500x500.jpg"
              }
              alt={this.props.displayName}
              height="50"
              width="50"
            />
          </div>

          <div>
            <h3>{this.props.displayName || "Me"}</h3>
            <h4>Sauce Fanatic</h4>
          </div>
        </StyledHead>

        <StyledFoot>
          <Button displayType="outline">View profile</Button>
        </StyledFoot>
      </StyledLink>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {
    displayName: state.users.self.displayName,
    avatar: state.users.self.avatar
  };
};

export default connect(mapState2Props)(Profile);
