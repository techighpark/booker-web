import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    photo
    user
    book
    isLiked
    totalLikes
    hashtags
    totalComments
    comments
    createdAt
    updatedAt
  }
`;
