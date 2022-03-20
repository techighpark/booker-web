import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { LayoutP } from "../component/Shared/LayoutP";
import { SharedBox } from "../component/Shared/SharedBox";
import { FollowBook } from "../component/Book/FollowBook";
import { LikeBook } from "../component/Book/LikeBook";
import useUser from "../hook/useUser";

const SEE_BOOK = gql`
  query seeBook($id: Int!) {
    seeBook(id: $id) {
      id
      title
      subtitle
      publishedAt
      bookCover
      author {
        id
        fullName
      }
      follower {
        username
      }
      totalFollower
      totalLikes
      isFollowing
      isLiked
    }
  }
`;

const BookBox = styled(SharedBox)`
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${props => props.theme.primary.bgColor};
  opacity: 0.5;
  border: none;
  margin-top: 50px;
  padding: 30px;
  /* box-sizing: border-box; */
  width: 100%;
  max-width: 700px;
`;
const BookCover = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: left bottom;
  width: 80%;
  height: 80%;
`;
const BookInfo = styled.div``;
const BookTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 10px;
  padding: 10px;
  color: white;
  border: 3px solid white;
  box-sizing: border-box;
  border-radius: 10px;
`;
const BookSubtitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  opacity: 0.5;
  margin-bottom: 5px;
`;
const BookDate = styled.div`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.5;
`;

const Author = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const BookProfile = () => {
  const { id } = useParams();
  const { data: bookData } = useQuery(SEE_BOOK, {
    variables: { id: parseInt(id) },
  });
  const { data: userData } = useUser();
  // console.log(userData);

  return (
    <LayoutP>
      <BookCover src={bookData?.seeBook?.bookCover} />
      <BookBox>
        <BookInfo>
          <BookTitle>{bookData?.seeBook?.title}</BookTitle>
          <BookSubtitle>{bookData?.seeBook?.subtitle}</BookSubtitle>
          <BookDate>{bookData?.seeBook?.publishedAt}</BookDate>
        </BookInfo>
        <Link to={`/author/${bookData?.seeBook?.author?.fullName}`}>
          <Author>{bookData?.seeBook?.author?.fullName}</Author>
        </Link>
        <FollowBook
          bookId={id}
          loggedInUser={userData}
          {...bookData?.seeBook}
        />
        <LikeBook bookId={id} loggedInUser={userData} {...bookData?.seeBook} />
      </BookBox>
    </LayoutP>
  );
};