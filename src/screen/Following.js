import { gql, useQuery } from "@apollo/client";

const SEE_FOLLOWING_USER_QUERY = gql`
  query seeFollowingUser($username: String!, $lastId: Int) {
    seeFollowingUser(username: $username, lastId: $lastId) {
      ok
      error
      followingUser {
        username
      }
    }
  }
`;

export const Following = () => {
  const { data, fetchMore } = useQuery(SEE_FOLLOWING_USER_QUERY, {
    variables: { username: "user1", lastId: null },
  });

  return (
    <div>
      {data?.seeFollowingUser?.followingUser?.map(user => (
        <div key={user.username}>{user.username}</div>
      ))}
      <button
        onClick={() =>
          fetchMore({
            variables: {
              lastId: data?.seeFollowingUser?.followingUser?.length,
            },
          })
        }
      >
        more
      </button>
    </div>
  );
};
