import {
  faUser as fasUser,
  faHeart as fasHeart,
  faPenToSquare as fasPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faHeart,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div``;
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
const AuthorName = styled.div`
  position: absolute;
  font-size: 16px;
  font-weight: 400;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 15px;
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

export const BookTab = profile => {
  return (
    <Container>
      <Grid>
        {profile?.followingBook?.map(book => (
          <Photo
            key={book.id}
            bg={book.bookCover}
            onClick={() => {
              window.location.replace(`/book/${book.id}`);
            }}
          >
            <AuthorName>{book.title}</AuthorName>
            <PhotoIcons>
              <Icon>
                <FontAwesomeIcon icon={book.isLiked ? fasHeart : faHeart} />
                {book.totalLikes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={book.isFollowing ? fasUser : faUser} />
                {book.totalFollower}
              </Icon>
              <Icon>
                <FontAwesomeIcon
                  icon={book.isFollowing ? fasPenToSquare : faPenToSquare}
                />
                {book.totalReviews}
              </Icon>
            </PhotoIcons>
          </Photo>
        ))}
      </Grid>
    </Container>
  );
};
