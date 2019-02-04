import * as React from "react";

import Trigger from "../Trigger/Trigger";
import Body from "../Body/Body";

export interface DropdownProps {
  children: JSX.Element[];
}

export interface DropdownState {}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);

    this.state = {};
  }

  public render() {
    let TriggerChild = null;
    let BodyChild = null;
    this.props.children.map(child => {
      if (child.type.displayName === "Trigger") {
        TriggerChild = React.cloneElement(child, {});
      }
    });

    console.log(TriggerChild);
    return (
      <div>
        {TriggerChild}
        <Body>More stuff here</Body>
      </div>
    );
  }
}

export { Trigger, Body, Dropdown };
