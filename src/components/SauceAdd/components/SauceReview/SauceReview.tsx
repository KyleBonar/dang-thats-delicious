import * as React from "react";

import Label from "../../../Label/Label";
import { RadioButton } from "../../../RadioButton/RadioButton";
import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledDiv2
} from "../../SauceAddStyle";

export interface ISauceReviewProps {
  onRadioClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  addReview: boolean;
}

export default class SauceReview extends React.PureComponent<
  ISauceReviewProps,
  any
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Review">
          Would you like to add a review too? Do not review your own sauce.
          Blatantly altering scores will get your account banned and your review
          removed. Don't do it.
        </StyledDescriptor>
        <StyledRightSide>
          <StyledDiv2>
            <Label>Add Review</Label>

            <RadioButton
              id={"yesReview"}
              value={"Yes"}
              label={"Yes"}
              checked={this.props.addReview}
              onClick={this.props.onRadioClick}
              name="addReview"
            />
            <RadioButton
              id={"noReview"}
              value={"No"}
              label={"No"}
              checked={!this.props.addReview}
              onClick={this.props.onRadioClick}
              name="addReview"
            />
          </StyledDiv2>
        </StyledRightSide>
      </StyledRow>
    );
  }
}
