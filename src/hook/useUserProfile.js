import { gql, useQuery } from "@apollo/client";
import useUser from "./useUser";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      avatar
      followingBook {
        id
        title
      }
      followingAuthor {
        id
        fullName
        books {
          id
          title
        }
      }
    }
  }
`;

function useUserProfile() {
  const { data: userData } = useUser();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username: userData?.me?.username },
  });
  return { data };
}
export default useUserProfile;
