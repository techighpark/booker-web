import { gql, useQuery } from "@apollo/client";

const SEE_BOOKS_QUERY = gql`
  query seeBooks {
    seeBooks {
      id
      title
      subtitle
      publishedAt
      author {
        fullName
      }
    }
  }
`;

const useBookList = () => {
  const { data } = useQuery(SEE_BOOKS_QUERY);

  return { data };
};

export default useBookList;
