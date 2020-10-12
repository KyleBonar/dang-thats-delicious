import styled from "../../theme/styled-components";
import Select from "../Select/Select";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";

// assign image path
const SaucesImage = "/static/LandingPageImage.jpg";

export const HeroContainer = styled.div`
  background: #000;
  position: relative;
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-bottom: 3.5rem;
  }
`;
HeroContainer.displayName = "div";

export const HeroImage = styled.div`
  background-image: url('${SaucesImage}');
  background-size: cover;
  background-position-y: 45%;
  opacity: 0.45;
  height: 400px;
`;
HeroImage.displayName = "div";

export const HeroBody = styled.div`
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
HeroBody.displayName = "div";

export const HeroTitle = styled.h1`
  color: ${x => x.theme.landingHeroTextColor};
  font-family: FuturaMedium;
`;
HeroTitle.displayName = "h1";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;
StyledDiv.displayName = "div";

export const StyledSelect = styled(Select)`
  min-height: 30px;
  border: 0px;
  box-sizing: border-box;

  > div {
    width: auto;

    &:after {
      top: 3px;
    }
  }

  select {
    width: auto;
    border: 0;
  }
`;
StyledSelect.displayName = "select";

export const StyledInput = styled(TextInput)`
  flex-direction: row;
  align-items: stretch;

  input {
    border: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: 100%;
    min-width: auto;
    max-width: 100%;
    padding: 0.66em;
    box-sizing: border-box;
    border: 0px;
    font-size: 1em;

    @media (min-width: ${props => props.theme.smToMd}) {
      min-width: 20em;
    }
  }
`;
StyledInput.displayName = "input";

export const StyledButton = styled(Button)`
  display: flex;
`;
StyledButton.displayName = "button";
