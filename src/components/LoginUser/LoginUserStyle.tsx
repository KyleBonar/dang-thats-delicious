import styled from "../../theme/styled-components";
import { Button } from "../Button/Button";

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledButton = styled(Button)`
  text-align: center;
`;
StyledButton.displayName = "Button";

export const StyledText = styled.p`
  text-align: center;
  width: 100%;
  max-width: 80%;
  margin: 0.5em auto;
`;

export const StyledFooterDivs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  > div > label {
    font-size: 0.85rem;
    text-transform: inherit;
  }
`;
