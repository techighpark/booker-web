import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { gql, useMutation } from "@apollo/client";

const LikeBtn = styled.div`
  color: ${props => (props.isFollowing ? props.theme.secondary.bgColor : "")};
  opacity: 1;
  &:hover {
    cursor: pointer;
  }
`;

const TOGGLE_BOOK_LIKE_MUTATION = gql`
  mutation toggleBookLike($bookId: Int!) {
    toggleBookLike(bookId: $bookId) {
      id
      ok
      error
    }
  }
`;

export const LikeBookBtn = ({ bookId, isLiked, title }) => {
  const toggleBookLikeUpdate = (cache, result) => {
    const {
      data: {
        toggleBookLike: { ok },
      },
    } = result;
    if (!ok) {
      return;
    } else {
      cache.modify({
        id: `Book:${title}`,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalLikes(prev) {
            return isLiked ? prev - 1 : prev + 1;
          },
        },
      });
    }
  };
  const [toggleBookLikeMutation] = useMutation(TOGGLE_BOOK_LIKE_MUTATION, {
    variables: { bookId: parseInt(bookId) },
    update: toggleBookLikeUpdate,
  });
  return (
    <LikeBtn isLiked={isLiked} onClick={toggleBookLikeMutation}>
      <FontAwesomeIcon icon={isLiked ? fasHeart : faHeart} size={"1x"} />
    </LikeBtn>
  );
};
