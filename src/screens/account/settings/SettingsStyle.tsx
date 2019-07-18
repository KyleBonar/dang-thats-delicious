import styled from "styled-components";
import Article from "../../../components/Article/Article";
import { Button } from "../../../components/Button/Button";

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
export const StyledContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
`;

export const StyledText = styled.p`
  width: 80%;
  margin: 0 auto 1em;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  button {
    color: #333;
  }

  svg {
    width: 20px;
    padding-left: 10px;
    transition: all 0.2s ease;
  }
`;

export const StyledGroup = styled.div`
  margin-bottom: 32px;
`;
