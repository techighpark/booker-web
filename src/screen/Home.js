import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { LayoutP } from "../component/Shared/LayoutP";
import { Post } from "../component/Feed/Post";

const Container = styled.div``;

const SEE_FEED_QUERY = gql`
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
      <Container>
        {data?.seeFeed?.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </Container>
    </LayoutP>
  );
};
