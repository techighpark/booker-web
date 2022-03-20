import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { userLogOut } from "../../apollo";

const LogOutBtn = styled.span`
  color: ${props => props.theme.button.fontColor};
  margin: 0px 20px;
  svg {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.button.accent.fontColor};
    }
  }
`;

export const CLogOutBtn = () => {
  return (
    <LogOutBtn type={"submit"} onClick={() => userLogOut()}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} size={"lg"} />
    </LogOutBtn>
  );
};
