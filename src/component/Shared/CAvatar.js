import styled from "styled-components";

const getSize = avatarSize => {
  if (avatarSize === "lg") {
    return "150px";
  } else if (avatarSize === "s") {
    return "30px";
  } else if (avatarSize === "xs") {
    return "25px";
  }
};

const SAvatarContainer = styled.div`
  width: ${props => getSize(props.avatarSize)};
  height: ${props => getSize(props.avatarSize)};
  margin: 0px 15px;
  border-radius: 50%;
  overflow: hidden;
`;
const SAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

export const CAvatar = ({ url, avatarSize }) => {
  return (
    <SAvatarContainer avatarSize={avatarSize}>
      <SAvatar src={url}></SAvatar>
    </SAvatarContainer>
  );
};
