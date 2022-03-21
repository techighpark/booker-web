import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { gql, useMutation } from "@apollo/client";

const FollowBtn = styled.div`
  margin-bottom: 10px;
  color: ${props => (props.isFollowing ? props.theme.secondary.bgColor : "")};
  opacity: 1;
  &:hover {
    cursor: pointer;
  }
`;

const FOLLOW_AUTHOR = gql`
  mutation followAuthor($authorId: Int!) {
    followAuthor(authorId: $authorId) {
      ok
      error
    }
  }
`;
const UNFOLLOW_AUTHOR = gql`
  mutation unfollowAuthor($authorId: Int!) {
    unfollowAuthor(authorId: $authorId) {
      ok
      error
    }
  }
`;

export const FollowAuthorBtn = ({
  loggedInUser,
  id: authorId,
  totalFollower,
  isFollowing,
  fullName,
}) => {
  const parsedBookId = parseInt(authorId);
  const cacheUsername = loggedInUser?.me?.username;
  const fragmentId = `Author:${fullName}`;
  const fragment = gql`
    fragment AuthorFollow on Author {
      totalFollower
      isFollowing
    }
  `;

  const updateFollowAuthorMutation = (cache, result) => {
    const {
      data: {
        followAuthor: { ok },
      },
    } = result;
    if (ok) {
      const authorRef = cache.writeFragment({
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
          totalFollowingAuthor(prev) {
            return prev + 1;
          },
          followingAuthor(prev) {
            return [authorRef, ...prev];
          },
        },
      });
    }
  };

  const updateUnfollowAuthorMutation = (cache, result) => {
    const {
      data: {
        unfollowAuthor: { ok },
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
          totalFollowingAuthor(prev) {
            return prev - 1;
          },
          followingAuthor(prev) {
            const next = prev.filter(ref => `Author:${fullName}` !== ref.__ref);
            return next;
          },
        },
      });
    }
  };
  const [followBookMutation] = useMutation(FOLLOW_AUTHOR, {
    variables: { authorId: parsedBookId },
    update: updateFollowAuthorMutation,
  });

  const [unfollowBookMutation] = useMutation(UNFOLLOW_AUTHOR, {
    variables: { authorId: parsedBookId },
    update: updateUnfollowAuthorMutation,
  });
  return (
    <FollowBtn
      isFollowing={isFollowing}
      onClick={isFollowing ? unfollowBookMutation : followBookMutation}
    >
      <FontAwesomeIcon
        icon={isFollowing ? fasBookmark : faBookmark}
        size={"1x"}
      />
    </FollowBtn>
  );
};
