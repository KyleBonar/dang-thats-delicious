import styled from "../../theme/styled-components";
import { Button } from "../../components/Button/Button";

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
StyledFormContainer.displayName = "StyledFormContainer";

export const StyledText = styled.p`
  width: 80%;
  margin: 0 auto 1em;
  text-align: center;
`;
StyledText.displayName = "StyledText";

export const StyledButton = styled(Button)`
  text-align: center;
`;
StyledButton.displayName = "StyledButton";
