import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import useUser from "../../hook/useUser";
import { SEE_FEED_QUERY } from "../../screen/Home";

const FollowBtn = styled.div`
  width: 100px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: ${props =>
    props.isFollowing ? "" : props.theme.button.accent.bgColor};
  color: ${props => props.theme.button.accent.fontColor};
  border: ${props =>
    props.isFollowing
      ? `1px solid ${props.theme.button.activeBorderColor}`
      : ""};
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => props.theme.button.accent.fontColor};
    color: ${props => props.theme.button.accent.bgColor};
    font-weight: 600;
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: Int!) {
    followUser(userId: $userId) {
      ok
      error
    }
  }
`;
const UNFOLLOW_USER_MUTATION = gql`
  mutation unFollowUser($userId: Int!) {
    unFollowUser(userId: $userId) {
      ok
      error
    }
  }
`;

export const FollowUSerBtn = ({ userId, username, isFollowing }) => {
  const { data: userData } = useUser();

  const followUserUpdate = (cache, result) => {
    const {
      data: {
        followUser: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowingUser(prev) {
            return prev + 1;
          },
        },
      });
      cache.modify({
        id: `User:${username}`,
        fields: {
          totalFollowerUser(prev) {
            return prev + 1;
          },
          isFollowing(prev) {
            return !prev;
          },
        },
      });
    }
  };
  const unFollowUserUpdate = (cache, result) => {
    const {
      data: {
        unFollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    } else {
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowingUser(prev) {
            return prev - 1;
          },
        },
      });
      cache.modify({
        id: `User:${username}`,
        fields: {
          totalFollowerUser(prev) {
            return prev - 1;
          },
          isFollowing(prev) {
            return !prev;
          },
        },
      });
    }
  };
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    update: followUserUpdate,
    refetchQueries: [{ query: SEE_FEED_QUERY }],
  });
  const [unFollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    update: unFollowUserUpdate,
    refetchQueries: [{ query: SEE_FEED_QUERY }],
  });
  const onFollow = () => {
    followUserMutation({ variables: { userId } });
  };
  const onUnfollow = () => {
    unFollowUserMutation({ variables: { userId } });
  };
  return (
    <FollowBtn
      onClick={isFollowing ? onUnfollow : onFollow}
      isFollowing={isFollowing}
    >
      {isFollowing ? "Following" : "Follow"}
    </FollowBtn>
  );
};
