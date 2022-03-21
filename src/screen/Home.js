import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { LayoutP } from "../component/Shared/LayoutP";
import { Post } from "../component/Feed/Post";
import { PageTitle } from "../component/Shared/PageTitle";

const Container = styled.div``;

export const SEE_FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      photo
      user {
        username
        avatar
      }
      book {
        id
        title
        author {
          fullName
        }
      }
      isLiked
      totalLikes
      caption
      hashtags {
        id
        hashtag
      }
      totalComments
      comments {
        id
        payload
        isMine
        user {
          username
          avatar
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const Home = () => {
  const { data } = useQuery(SEE_FEED_QUERY);
  return (
    <LayoutP>
      <PageTitle title={"Home"} />
      <Container>
        {data?.seeFeed?.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </Container>
    </LayoutP>
  );
};
