import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { gql, useMutation } from "@apollo/client";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
`;

const Follower = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
const FollowBtn = styled.div`
  margin-bottom: 10px;
  color: ${props => (props.isFollowing ? props.theme.secondary.bgColor : "")};
  opacity: 1;
  &:hover {
    cursor: pointer;
  }
`;

const FOLLOW_BOOK = gql`
  mutation followBook($bookId: Int!) {
    followBook(bookId: $bookId) {
      ok
      error
    }
  }
`;
const UNFOLLOW_BOOK = gql`
  mutation unfollowBook($bookId: Int!) {
    unfollowBook(bookId: $bookId) {
      ok
      error
    }
  }
`;

export const FollowBook = ({
  loggedInUser,
  bookId,
  totalFollower,
  isFollowing,
  title,
}) => {
  const parsedBookId = parseInt(bookId);
  const cacheUsername = loggedInUser?.me?.username;
  const fragmentId = `Book:${title}`;
  const fragment = gql`
    fragment BookFollow on Book {
      totalFollower
      isFollowing
    }
  `;

  const updateFollowBookMutation = (cache, result) => {
    const {
      data: {
        followBook: { ok },
      },
    } = result;
    if (ok) {
      const newBookRef = cache.writeFragment({
        id: fragmentId,
        fragment,
        data: {
          isFollowing: !isFollowing,
          totalFollower: totalFollower + 1,
        },
      });

      cache.modify({
        id: `User:${cacheUsername}`,
        fields: {
          totalFollowingBook(prev) {
            return prev + 1;
          },
          followingBook(prev) {
            return [newBookRef, ...prev];
          },
        },
      });
    }
  };

  const updateUnfollowBookMutation = (cache, result) => {
    const {
      data: {
        unfollowBook: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: fragmentId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollower(prev) {
            return prev - 1;
          },
        },
      });

      cache.modify({
        id: `User:${cacheUsername}`,
        fields: {
          totalFollowingBook(prev) {
            return prev - 1;
          },
          followingBook(prev) {
            const next = prev.filter(ref => `Book:${title}` !== ref.__ref);
            return next;
          },
        },
      });
    }
  };
  const [followBookMutation] = useMutation(FOLLOW_BOOK, {
    variables: { bookId: parsedBookId },
    update: updateFollowBookMutation,
  });

  const [unfollowBookMutation] = useMutation(UNFOLLOW_BOOK, {
    variables: { bookId: parsedBookId },
    update: updateUnfollowBookMutation,
  });
  return (
    <Container>
      <Follower> Followers {totalFollower}</Follower>
      <FollowBtn
        isFollowing={isFollowing}
        onClick={isFollowing ? unfollowBookMutation : followBookMutation}
      >
        <FontAwesomeIcon
          icon={isFollowing ? fasBookmark : faBookmark}
          size={"1x"}
        />
      </FollowBtn>
    </Container>
  );
};
