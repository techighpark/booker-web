import { gql, useMutation } from "@apollo/client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import useUser from "../../hook/useUser";

const DeleteBtn = styled.span`
  position: absolute;
  margin: 20px;
  bottom: 0px;
  cursor: pointer;
  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: Int!) {
    deletePost(postId: $postId) {
      ok
      error
    }
  }
`;

export const DeletePostBtn = ({ postId, setPopUpDeleted }) => {
  const { data: userData } = useUser();
  const deletePostUpdate = (cache, result) => {
    const {
      data: {
        deletePost: { ok },
      },
    } = result;
    if (ok) {
      setPopUpDeleted(true);
      const deletedPostRef = cache.readFragment({
        id: `Post:${postId}`,
        fragment: gql`
          fragment DeletePost on Post {
            id
            photo
            totalComments
            totalLikes
            isLiked
          }
        `,
      });

      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          posts(prev, { readField }) {
            return prev.filter(
              ref => deletedPostRef.id !== readField("id", ref)
            );
          },
        },
      });

      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev, { readField }) {
            return prev.filter(
              ref => deletedPostRef.id !== readField("id", ref)
            );
          },
        },
      });
    }
  };
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update: deletePostUpdate,
  });
  return (
    <DeleteBtn onClick={deletePostMutation}>
      <FontAwesomeIcon icon={faTrashCan} size={"1x"} />
    </DeleteBtn>
  );
};
