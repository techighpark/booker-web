import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CAvatar } from "../component/Shared/CAvatar";
import { LayoutP } from "../component/Shared/LayoutP";
import { CUsername } from "../component/Shared/CUsername";
import { CItemLink } from "../component/Link/CItemLink";

const Wrapper = styled.div``;
const ConatinerName = styled.div`
  width: 400px;
  font-size: 12px;
  padding-bottom: 5px;
  margin-top: 30px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;
const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 15px;
`;
const ResultMsg = styled.div`
  font-size: 12px;
  margin-left: 20px;
  color: rgba(255, 255, 255, 0.5);
`;
const SEARCH_QUERY = gql`
  query searchAll($keyword: String!) {
    searchAll(keyword: $keyword) {
      users {
        id
        username
        avatar
      }
      authors {
        id
        fullName
        photoProfile
      }
      books {
        id
        title
        bookCover
        author {
          fullName
        }
      }
      hashtags {
        id
        hashtag
      }
    }
  }
`;

export const SearchResult = () => {
  const location = useLocation();
  const {
    state: { keyword },
  } = location;
  const { data, loading } = useQuery(SEARCH_QUERY, { variables: { keyword } });

  return (
    <LayoutP>
      <Wrapper>
        <ConatinerName>User</ConatinerName>
        {data?.searchAll?.users.length !== 0 ? (
          data?.searchAll?.users?.map(user => (
            <Container key={user.id}>
              <CAvatar url={user.avatar} avatarSize={"xs"} />
              <CUsername username={user.username} usernameSize={"xs"} />
            </Container>
          ))
        ) : (
          <ResultMsg>There are no users.</ResultMsg>
        )}

        <ConatinerName>Author</ConatinerName>
        {data?.searchAll?.authors.length !== 0 ? (
          data?.searchAll?.authors?.map(author => (
            <Container key={author.id}>
              <CAvatar url={author.photoProfile} avatarSize={"xs"} />
              <CItemLink
                url={author.fullName}
                text={author.fullName}
                itemSize={"xs"}
              />
            </Container>
          ))
        ) : (
          <ResultMsg>There are no authors.</ResultMsg>
        )}

        <ConatinerName>Books</ConatinerName>
        {data?.searchAll?.books.length !== 0 ? (
          data?.searchAll?.books?.map(book => (
            <Container key={book.id}>
              <CAvatar url={book.bookCover} avatarSize={"xs"} />
              <CItemLink url={book.id} text={book.title} book itemSize={"xs"} />
            </Container>
          ))
        ) : (
          <ResultMsg>There are no books.</ResultMsg>
        )}

        <ConatinerName>Hashtags</ConatinerName>
        {data?.searchAll?.hashtags.length !== 0 ? (
          data?.searchAll?.hashtags?.map(hashtag => (
            <Container key={hashtag.id}>
              <div>{hashtag.hashtag}</div>
            </Container>
          ))
        ) : (
          <ResultMsg>There are no hashtags.</ResultMsg>
        )}
      </Wrapper>
    </LayoutP>
  );
};
