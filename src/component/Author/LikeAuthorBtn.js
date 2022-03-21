import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { gql, useApolloClient, useMutation } from "@apollo/client";

const LikeBtn = styled.div`
  color: ${props => (props.isFollowing ? props.theme.secondary.bgColor : "")};
  opacity: 1;
  &:hover {
    cursor: pointer;
  }
`;

const TOGGLE_AUTHOR_LIKE_MUTATION = gql`
  mutation toggleAuthorLike($authorId: Int!) {
    toggleAuthorLike(authorId: $authorId) {
      ok
    }
  }
`;

export const LikeAuthorBtn = ({ id, fullName, isLiked }) => {
  const { cache } = useApolloClient();
  const toggleAuthorLikeCompleted = data => {
    const {
      toggleAuthorLike: { ok },
    } = data;
    if (!ok) {
      return;
    } else {
      cache.modify({
        id: `Author:${fullName}`,
        fields: {
          totalLikes(prev) {
            return isLiked ? prev - 1 : prev + 1;
          },
          isLiked(prev) {
            return !prev;
          },
        },
      });
    }
  };
  const [toggleAuthorLikeMutation] = useMutation(TOGGLE_AUTHOR_LIKE_MUTATION, {
    variables: { authorId: id },
    onCompleted: toggleAuthorLikeCompleted,
  });
  return (
    <LikeBtn isLiked={isLiked} onClick={toggleAuthorLikeMutation}>
      <FontAwesomeIcon icon={isLiked ? fasHeart : faHeart} size={"1x"} />
    </LikeBtn>
  );
};
