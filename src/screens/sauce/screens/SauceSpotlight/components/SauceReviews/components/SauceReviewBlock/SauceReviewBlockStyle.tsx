import styled from "styled-components";
import Star from "../../../../../../../../images/icons/Star";
import { Button } from "../../../../../../../../components/Button/Button";

export const StyledContainer = styled.div`
  border: ${props => props.theme.border};
  font-family: AvenirNextReg;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 1em;
  max-height: auto;
`;

export const StyledButton = styled(Button)`
  background-color: ${props => props.theme.lightGrey};
  display: flex;
  align-items: stretch;
  font-size: 1.5em;

  > button {
    background-color: inherit;
    transition: none;
    padding: 0.25em;
    margin: 0;

    &:hover,
    &:focus {
      background-color: inherit;
    }
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.secondaryThemeColor};
    cursor: pointer;
  }
`;

export const StyledContentContainer = styled.div`
  padding: 1em;
`;

export const StyledCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 1em;

  > i {
    padding: 0 0.5em 0 0;
  }
`;

export const StyledCategoryDescription = styled.p`
  margin-top: 0px;
  padding: 0 2em;
`;

export const StyledEmptyStar = styled(Star)`
  .border {
    fill: ${props => props.theme.primaryThemeColor};
  }

  .center {
    fill: transparent;
  }
`;

export const StyledFullStar = styled(Star)`
  .border,
  .center {
    fill: ${props => props.theme.primaryThemeColor};
  }
`;
