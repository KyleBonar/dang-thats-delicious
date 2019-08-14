import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: ${props => props.theme.inputBorder};
  margin-top: 5px;
  margin-bottom: 15px;
`;
StyledInput.displayName = "StyledInput";
