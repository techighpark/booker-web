import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 100px;
`;
const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 50px;
`;
const Photo = styled.div`
  position: relative;
  background-image: url(${props => props.bg});
  background-size: cover;
`;

const AuthorName = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 24px;
  font-weight: 600;
  margin-top: 50px;
`;
const PhotoIcons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

export const AuthorTab = profile => {
  return (
    <Container>
      <Grid>
        {profile?.followingAuthor?.map(author => (
          <Photo key={author.id} bg={author.photoProfile}>
            <AuthorName>{author.fullName}</AuthorName>
            <PhotoIcons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {author.totalLikes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faUser} />
                {author.totalFollower}
              </Icon>
            </PhotoIcons>
          </Photo>
        ))}
      </Grid>
    </Container>
  );
};
