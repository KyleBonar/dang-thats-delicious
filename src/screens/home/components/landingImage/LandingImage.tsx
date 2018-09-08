import * as React from "react";

import styled from "../../../../theme/styled-components";
import DropDown from "./components/DropDown/DropDown";

const HeroContainer = styled.header`
  background: #000;
  position: relative;
`;

const HeroImage = styled.div`
  background-image: url("../../../../images/photos/Sauces.jpg");
  background-size: cover;
  background-position-y: 45%;
  opacity: 0.45;
  height: 400px;
`;

const HeroBody = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  color: ${x => x.theme.landingHeroTextColor};
`;

export interface LandingImageProps {}

export interface LandingImageState {}

class LandingImage extends React.Component<
  LandingImageProps,
  LandingImageState
> {
  constructor(props: LandingImageProps) {
    super(props);

    this.state = {};
  }
  public render() {
    const options = ["All", "Hot Sauce", "Meat Sauce"];
    return (
      <HeroContainer>
        <HeroImage />
        <HeroBody>
          <HeroTitle>Find your perfect sauce</HeroTitle>
          <div>
            <DropDown options={options} />
          </div>
        </HeroBody>
      </HeroContainer>
    );
  }
}

export default LandingImage;
