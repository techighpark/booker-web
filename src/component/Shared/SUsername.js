import { Link } from "react-router-dom";
import styled from "styled-components";

const getFontSize = usernameSize => {
  if (usernameSize === "lg") {
    return "30px";
  } else if (usernameSize === "s") {
    return "16px";
  } else if (usernameSize === "xs") {
    return "12px";
  }
};
const getFontWeight = usernameSize => {
  if (usernameSize === "lg") {
    return "700";
  } else if (usernameSize === "s") {
    return "600";
  } else if (usernameSize === "xs") {
    return "500";
  }
};

const Username = styled.div`
  font-size: ${props => getFontSize(props.usernameSize)};
  font-weight: ${props => getFontWeight(props.usernameSize)};
`;

export const CUsername = ({ username, usernameSize }) => {
  return (
    <Link to={`/user/${username}`}>
      <Username usernameSize={usernameSize}>{username}</Username>
    </Link>
  );
};
