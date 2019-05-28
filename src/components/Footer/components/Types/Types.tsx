import * as React from "react";
import { connect } from "react-redux";

import List from "../../../List/List";
import { AppState } from "../../../../redux/configureStore";
import styled from "styled-components";

const StyledList = styled(List)`
  h5,
  a {
    color: ${x => x.theme.white};
  }
`;

export interface TypesProps {
  types: string[];
}

class Types extends React.PureComponent<TypesProps, any> {
  private items = this.props.types.map(type => {
    return { link: "#", text: type };
  });

  public render() {
    return <StyledList title="Type of Sauce" items={this.items} />;
  }
}

const mapState2Props = (state: AppState) => {
  return { types: state.sauces.types };
};

export default connect(mapState2Props)(Types);
