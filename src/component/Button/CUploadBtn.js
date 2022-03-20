import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UploadBtn = styled.span`
  color: ${props => props.theme.button.fontColor};
  margin: 0px 20px;
  svg {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.button.accent.fontColor};
    }
  }
`;

export const CUploadBtn = () => {
  return (
    <UploadBtn>
      <Link to={"/account/upload"}>
        <FontAwesomeIcon icon={faSquarePlus} size={"lg"} />
      </Link>
    </UploadBtn>
  );
};
