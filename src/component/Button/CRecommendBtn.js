import { faFaceGrinWide } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RecommendBtn = styled.span`
  color: ${props => props.theme.button.fontColor};
  margin: 0px 20px;
  svg {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.button.accent.fontColor};
    }
  }
`;

export const CRecommendBtn = () => {
  return (
    <RecommendBtn>
      <Link to={"/recommend"}>
        <FontAwesomeIcon icon={faFaceGrinWide} size={"lg"} />
      </Link>
    </RecommendBtn>
  );
};
