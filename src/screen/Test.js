import { gql, useQuery } from "@apollo/client";

const SEE_POST_QUERY = gql`
  query seePost($postId: Int!) {
    seePost(postId: $postId) {
      photo
    }
  }
`;

export const Test = () => {
  const { data, loading } = useQuery(SEE_POST_QUERY, {
    variables: { postId: 8 },
  });

  console.log(data);
  return <div>test</div>;
};
