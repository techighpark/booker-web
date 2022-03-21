import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FollowAuthorBtn } from "../component/Author/FollowAuthorBtn";
import { LikeAuthorBtn } from "../component/Author/LikeAuthorBtn";
import { LayoutP } from "../component/Shared/LayoutP";
import { PageTitle } from "../component/Shared/PageTitle";
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

const ActionContainer = styled.div``;
const Follower = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
const Likes = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
const TotalBooks = styled.div``;

export const AuthorProfile = () => {
  const { fullName } = useParams();
  const { data: userData, loading } = useUser();
  const { data } = useQuery(SEE_AUTHOR, { variables: { fullName } });
  return (
    <LayoutP>
      <PageTitle
        title={loading ? "loading..." : `Author | ${data?.seeAuthor?.fullName}`}
      />
      <AuthorBox>
        <AuthorPhoto src={data?.seeAuthor?.photoProfile} />
        <FullName>{data?.seeAuthor?.fullName}</FullName>
        <AuthorInfo>
          <TotalBooks>Total Books {data?.seeAuthor?.totalBooks}</TotalBooks>
          <ActionContainer>
            <Follower> Followers {data?.seeAuthor?.totalFollower}</Follower>
            <FollowAuthorBtn loggedInUser={userData} {...data?.seeAuthor} />
          </ActionContainer>
          <ActionContainer>
            <Likes>Likes {data?.seeAuthor?.totalLikes}</Likes>
            <LikeAuthorBtn loggedInUser={userData} {...data?.seeAuthor} />
          </ActionContainer>
        </AuthorInfo>
        <div>
          {data?.seeAuthor?.books?.map(book => (
            <div key={book.id}>
              {book.title}
              <img
                src={book.bookCover}
                width={"300px"}
                alt={book.bookCover}
              ></img>
            </div>
          ))}
        </div>
      </AuthorBox>
    </LayoutP>
  );
};
