import styled from "styled-components";
import { userLogOut } from "../../apollo";

const LogOutBtn = styled.span`
  background-color: ${props => props.theme.button.accent.bgColor};
  color: ${props => props.theme.button.accent.fontColor};
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  padding: 5px 10px;
  margin: 0px 10px;
  &:hover {
    background-color: ${props => props.theme.button.bgColor};
    color: ${props => props.theme.button.fontColor};
  }
`;

export const CLogOutBtn = () => {
  return (
    <LogOutBtn type={"submit"} onClick={() => userLogOut()}>
      Log Out
    </LogOutBtn>
  );
};
