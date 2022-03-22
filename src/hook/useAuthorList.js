import { gql, useQuery } from "@apollo/client";

const SEE_AUTHORS_QUERY = gql`
  query seeAuthors {
    seeAuthors {
      id
      fullName
      birth
      nationality
    }
  }
`;

const useAuthorList = () => {
  const { data } = useQuery(SEE_AUTHORS_QUERY);

  return { data };
};

export default useAuthorList;
