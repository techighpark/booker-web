import styled from "styled-components";

export const SAuthInputColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SAuthInputContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const SAuthInput = styled.input`
  background-color: ${props => props.theme.input.bgColor};
  color: ${props => props.theme.input.fontColor};
  font-weight: 500;
  width: 300px;
  padding: 8px 20px;
  margin: 4px 0px;
  box-sizing: border-box;
  border: 0.5px solid
    ${props => (props.hasError ? "red" : props.theme.input.borderColor)};
  border-radius: 1px;
  ::placeholder {
    color: ${props => props.theme.input.placeholderColor};
    font-size: 10px;
  }
`;
