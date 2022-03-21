import { useReactiveVar } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { popUpIdVar, popUpVar } from "../../apollo";
import { PopupPost } from "./PopupPost";

const Container = styled.div`
  margin-top: 100px;
`;
const Grid = styled.div`
  display: grid;
  grid-auto-rows: 20em;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
const Photo = styled.div`
  position: relative;
  width: 20em;
  background-image: url(${props => props.bg});
  background-size: cover;
`;
const PhotoIcons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0px 10px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

export const CPostGrid = ({ posts }) => {
  const popUp = useReactiveVar(popUpVar);
  const popUpId = useReactiveVar(popUpIdVar);
  const onClick = async id => {
    await popUpIdVar(id);
    await popUpVar(true);
  };

  return (
    <Container>
      <Grid>
        {posts?.map(post => (
          <Photo key={post.id} bg={post.photo} onClick={() => onClick(post.id)}>
            <PhotoIcons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {post.totalLikes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {post.totalComments}
              </Icon>
            </PhotoIcons>
          </Photo>
        ))}
      </Grid>
      <PopupPost popUp={popUp} postId={popUpId} />
    </Container>
  );
};
