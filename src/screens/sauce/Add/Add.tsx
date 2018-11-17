import * as React from "react";
import shortid from "shortid";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
// import DropNCrop from "@synapsestudios/react-drop-n-crop";
// import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";

import styled from "../../../theme/styled-components";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Descriptor from "../../../components/Descriptor/Descriptor";
import TextInput from "../../../components/TextInput/TextInput";

import { ISauce } from "../../../redux/sauce/types";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Label from "../../../components/Label/Label";

const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;

  > div {
    margin-bottom: 3.5rem;
  }
`;

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: top;
  padding-bottom: 4rem;
`;

const StyledDescriptor = styled(Descriptor)`
  width: 100%;
  max-width: 33%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const StyledRightSide = styled.div`
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  display: block;
`;

const StyledTextInput = styled(TextInput)`
  float: left;
  max-width: ${props =>
    props.type === "textarea"
      ? "100%"
      : "50%"}; // give Textarea full width and text 50%
  box-sizing: border-box;
  padding: 0 1rem;
`;

const StyledDiv = styled.div`
  max-width: 50%;
  float: left;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;

  > label {
    padding: 0rem;
  }

  > div {
    // margin: 0.25rem 1rem 0.25rem;
  }
`;

const StyledDiv2 = styled.div`
  padding: 0 1rem;
`;

const StyledDropdownContainer = styled.div`
  border: 1px solid #e1e1e1;
  color: #4b4b4b;
  display: inline-block;
  position: relative;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  width: 100%;

  &:after {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    content: url("../../../../../../images/icons/chevron-down.svg");
    pointer-events: none;
    right: 15px;
  }

  select {
    width: 100%;
    background-color: #f3f3f3;
    appearance: none;
    border: 0;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    vertical-align: middle;
    height: 38px;
    padding: 0px 40px 0 15px;
    font-size: 1rem;
  }
`;

// const StyledDropNCrop = styled(DropNCrop)`
//   .cropper-container.cropper-bg {
//     width: 100% !important;
//   }
// `;

export interface AddProps {}

export interface AddState extends ISauce {
  typesOfSauces: { [key: string]: { value: string; checked: boolean } };
  typesOfPeppers: { [key: string]: { value: string; checked: boolean } };
  country: string;
  city: string;
  state: string;
  DropNCrop: {
    result: null | string;
    filename: null | string;
    filetype: null | string;
    src: null | string;
    error: null | string;
  };
  DropNCropValue: any;
}

class Add extends React.Component<AddProps, AddState> {
  constructor(props: AddProps) {
    super(props);

    this.state = {
      _id: 0,
      name: "",
      ingredients: "",
      type: "",
      maker: "",
      description: "",
      photo: "",
      typesOfSauces: {
        "BBQ Sauce": { value: "BBQ Sauce", checked: false },
        "Hot Sauce": { value: "Hot Sauce", checked: false }
      },
      typesOfPeppers: {
        "Ghost Chili": { value: "Ghost Chili", checked: false },
        "Peri Peri": { value: "Peri Peri", checked: false },
        "Scotch Bonnet": { value: "Scotch Bonnet", checked: false },
        "Trinidad Scorpion": { value: "Trinidad Scorpion", checked: false }
      },
      country: "United States",
      state: "",
      city: "",
      DropNCrop: {
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null
      },
      DropNCropValue: {}
    };
  }

  public render() {
    return (
      <div>
        <Article>
          <PageTitle>Add Sauce</PageTitle>
          <StyledFormContainer>
            <StyledRow>
              <StyledDescriptor title="Title">
                What is the name of the sauce? Who is the maker? This is
                required.
              </StyledDescriptor>
              <StyledRightSide>
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="Name"
                  name="name"
                  id="name"
                  showLabel={true}
                  value={this.state.name}
                  required={true}
                />
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="Maker"
                  name="maker"
                  id="maker"
                  showLabel={true}
                  value={this.state.maker}
                  required={true}
                />
              </StyledRightSide>
            </StyledRow>
            <StyledRow>
              <StyledDescriptor title="Official Description">
                How does the maker describe the suace and/or flavor? This might
                be found directly on the bottle, a website, in an email, etc.
                This is NOT your review.
              </StyledDescriptor>
              <StyledRightSide>
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="Description"
                  name="description"
                  id="description"
                  showLabel={true}
                  value={this.state.description}
                  type="textarea"
                  required={true}
                />
              </StyledRightSide>
            </StyledRow>
            <StyledRow>
              <StyledDescriptor title="Ingredients">
                Which ingredients make up the sauce? This should be a comma
                seperated list found somewhere on the sauce label.
              </StyledDescriptor>
              <StyledRightSide>
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="Ingredients"
                  name="ingredients"
                  id="ingredients"
                  showLabel={true}
                  value={this.state.ingredients}
                  type="textarea"
                  required={true}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Type */}
            <StyledRow>
              <StyledDescriptor title="Type">
                What type of sauce is this? What is it primarily used for?
              </StyledDescriptor>
              <StyledRightSide>
                <StyledDiv2>
                  <Label>Type of Sauce</Label>

                  {Object.keys(this.state.typesOfSauces).map(type => {
                    return (
                      <CheckBox
                        id={shortid.generate()}
                        key={shortid.generate()}
                        value={this.state.typesOfSauces[type].value}
                        label={this.state.typesOfSauces[type].value}
                        checked={this.state.typesOfSauces[type].checked}
                        onClick={this.onCheckBoxClick}
                      />
                    );
                  })}
                </StyledDiv2>
              </StyledRightSide>
            </StyledRow>

            {/* Spice */}
            <StyledRow>
              <StyledDescriptor title="Spice">
                Is this sauce spicy? How spicy is it? What does the maker say
                the Scoville Heat Unit (SHU) rating is? Which peppers are
                primarily used?
              </StyledDescriptor>
              <StyledRightSide>
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="SHU"
                  name="shu"
                  id="shu"
                  showLabel={true}
                  value={this.state.shu}
                />

                <StyledDiv2>
                  <Label>Primary Peppers</Label>
                  {Object.keys(this.state.typesOfPeppers).map(type => {
                    return (
                      <CheckBox
                        id={shortid.generate()}
                        key={shortid.generate()}
                        value={this.state.typesOfPeppers[type].value}
                        label={this.state.typesOfPeppers[type].value}
                        checked={this.state.typesOfPeppers[type].checked}
                        onClick={this.onCheckBoxClick}
                      />
                    );
                  })}
                </StyledDiv2>
              </StyledRightSide>
            </StyledRow>

            {/* Location */}
            <StyledRow>
              <StyledDescriptor title="Location">
                Where was the sauce made?
              </StyledDescriptor>
              <StyledRightSide>
                <StyledDiv>
                  <Label>Country</Label>
                  <StyledDropdownContainer>
                    <CountryDropdown
                      value={this.state.country}
                      onChange={this.onCountryChange}
                    />
                  </StyledDropdownContainer>
                </StyledDiv>

                <StyledDiv>
                  <Label>State</Label>
                  <StyledDropdownContainer>
                    <RegionDropdown
                      country={this.state.country}
                      value={this.state.state}
                      onChange={this.onStateChange}
                    />
                  </StyledDropdownContainer>
                </StyledDiv>
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="City"
                  name="city"
                  id="city"
                  showLabel={true}
                  value={this.state.city}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Photo */}
            {/* <StyledRow>
              <StyledDescriptor title="Photo">
                If you have a picture of the bottle, please upload it! If the
                picture is unclear, blurry, or missing completely, an admin may
                replace it with a different one.
              </StyledDescriptor>
              <StyledRightSide>
                <StyledDropNCrop
                  onChange={this.onDropNCropChange}
                  value={this.state.DropNCropValue}
                  canvasWidth={"100%"}
                />
              </StyledRightSide>
            </StyledRow> */}
          </StyledFormContainer>
        </Article>
      </div>
    );
  }

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target || !event.target.value) {
      return;
    }

    // Grab the name and value
    const { name, value }: { name: string; value: string } = event.target;

    // Update local state
    this.setState({
      ...this.state,
      [name.toLowerCase()]: value
    });
  };

  private onCheckBoxClick = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    // Cast EventTarget to be HTMLInput Element so we can be sure to have a .value property
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;

    // Grab value from the element
    const value: string = checkbox.value;

    // Find is value is sauce type or pepper
    const type =
      Object.keys(this.state.typesOfSauces).indexOf(value) !== -1
        ? "typesOfSauces"
        : "typesOfPeppers";

    // Get whether checked or not
    const checked: boolean = this.state[type][value].checked;

    // Update state
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        [value]: { value, checked: !checked }
      }
    });
  };

  private onCountryChange = (val: string) => {
    this.setState({
      ...this.state,
      country: val
    });
  };

  private onStateChange = (val: string) => {
    this.setState({
      ...this.state,
      state: val
    });
  };

  private onDropNCropChange = (val: any) => {
    console.log(val);
    this.setState({ ...this.state, DropNCropValue: val });
  };
}

export default Add;
