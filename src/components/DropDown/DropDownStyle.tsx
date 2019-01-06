import styled from "../../theme/styled-components";

export const SelectContainer = styled.div`
  width: 100%;
  border: 1px solid #e1e1e1;
  color: #4b4b4b;
  display: inline-block;
  position: relative;
  background-color: #f5f5f5;

  &:after {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    content: url("../../../../../../images/icons/chevron-down.svg");
    pointer-events: none;
    right: 15px;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  background-color: transparent;
  appearance: none;
  border: 0;
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
  vertical-align: middle;
  height: 58px;
  padding: 0px 40px 0 15px;
  font-size: 1rem;
`;
StyledSelect.displayName = "StyledSelect"; // useful for testing
