import styled from "styled-components";

export const SharedBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 500px;
  border: 1px solid ${props => props.theme.box.borderColor};
`;
