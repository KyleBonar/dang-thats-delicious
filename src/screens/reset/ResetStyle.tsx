import styled from "styled-components";
import { Article } from "../../components/Article/Article";
import { Button } from "../../components/Button/Button";

export const StyledDiv = styled.div`
  height: 100vh;
`;

export const StyledLogoContainer = styled.div`
  max-width: 150px;
  margin: 0 auto;
  padding: 1em;
`;

export const StyledArticle = styled(Article)`
  max-width: 600px;
`;
export const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledText = styled.p`
  margin: 0 auto 1em;
`;

export const StyledButton = styled(Button)`
  text-align: center;
`;
