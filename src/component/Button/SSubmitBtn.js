import styled from "styled-components";

export const SSubmitBtn = styled.input`
  background-color: ${props => props.theme.button.bgColor};
  color: ${props => props.theme.fontColor};
  width: 200px;
  height: 30px;
  text-align: center;
  padding: 8px 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 12px;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? "none" : "fill")};
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  &:hover {
    background-color: ${props => props.theme.button.hoverBgColor};
  }
  &:active {
    border: 0.2px solid ${props => props.theme.button.activeBorderColor};
  }
`;
