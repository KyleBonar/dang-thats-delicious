import styled from "styled-components";
import Article from "../../components/Article/Article";
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
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledButton = styled(Button)`
  text-align: center;
`;

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
