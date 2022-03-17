import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FollowAuthor } from "../component/Author/FollowAuthor";
import { LikeAuthor } from "../component/Author/LikeAuthor";
import { LayoutP } from "../component/Shared/LayoutP";
import { SharedBox } from "../component/Shared/SharedBox";
import useUser from "../hook/useUser";

const SEE_AUTHOR = gql`
  query seeAuthor($fullName: String!) {
    seeAuthor(fullName: $fullName) {
      id
      fullName
      photoProfile
      totalBooks
      books {
        id
        title
        bookCover
      }
      isFollowing
      isLiked
      totalFollower
      totalLikes
    }
  }
`;

const AuthorBox = styled(SharedBox)`
  position: absolute;
  justify-content: space-around;
  background-color: ${props => props.theme.primary.bgColor};
  border: none;
  margin-top: 50px;
  padding: 30px;
  width: 100%;
  max-width: 700px;
`;
const AuthorPhoto = styled.img`
  width: 100%;
`;
const FullName = styled.div`
  font-weight: 700;
  font-size: 30px;
  margin-top: 20px;
`;
const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 30px;
`;
const TotalBooks = styled.div``;

export const AuthorProfile = () => {
  const { fullName } = useParams();
  const { data: userData } = useUser();
  const { data } = useQuery(SEE_AUTHOR, { variables: { fullName } });
  return (
    <LayoutP>
      <AuthorBox>
        <AuthorPhoto src={data?.seeAuthor?.photoProfile} />
        <FullName>{data?.seeAuthor?.fullName}</FullName>
        <AuthorInfo>
          <TotalBooks>Total Books {data?.seeAuthor?.totalBooks}</TotalBooks>
          <FollowAuthor loggedInUser={userData} {...data?.seeAuthor} />
          <LikeAuthor loggedInUser={userData} {...data?.seeAuthor} />
        </AuthorInfo>
        <div>
          {data?.seeAuthor?.books?.map(book => (
            <div key={book.id}>
              {book.title}
              <img src={book.bookCover} width={"300px"}></img>
            </div>
          ))}
        </div>
      </AuthorBox>
    </LayoutP>
  );
};
