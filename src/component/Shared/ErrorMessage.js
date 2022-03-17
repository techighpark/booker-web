import styled from "styled-components";

export const ErrorMessage = styled.div`
  width: 100%;
  max-width: 300px;
  font-weight: lighter;
  color: red;
  font-size: 10px;
  word-spacing: 1px;
  line-height: 140%;
  text-align: center;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: ${props => (props.hasError ? null : "none")};
`;
