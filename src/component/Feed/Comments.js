import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hook/useUser";
import { Comment } from "./Comment";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  width: 100%;
  input {
    text-align: left;
  }
`;

const CommentTotal = styled.div`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5;
  margin: 8px 0px 12px 0px;
`;

const CREATE_COMMENT = gql`
  mutation createComment($postId: Int!, $payload: String!) {
    createComment(postId: $postId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

export const Comments = ({
  postId,
  author,
  caption,
  totalComments,
  comments,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { data: userData } = useUser();

  const onValidSubmit = data => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({ variables: { postId, payload } });
  };

  const createCommentUpadte = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newWriteComment = cache.writeFragment({
        id: `Comment${id}`,
        fragment: gql`
          fragment NewWriteComment on Comment {
            id
            payload
            isMine
            user
            createdAt
          }
        `,
        data: {
          id,
          payload,
          isMine: true,
          user: { ...userData.me },
          createdAt: Date.now() + "",
        },
      });

      cache.modify({
        id: `Post:${postId}`,
        fields: {
          comments(prev) {
            return [...prev, newWriteComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT, {
    update: createCommentUpadte,
  });
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentTotal>
        {totalComments === 1 ? "1 comment" : `${totalComments} comments`}
      </CommentTotal>
      {totalComments > 4 ? (
        "more"
      ) : (
        <>
          {comments?.map(comment => (
            <Comment
              key={comment.id}
              postId={postId}
              commentId={comment.id}
              author={comment.user.username}
              payload={comment.payload}
              isMine={comment.isMine}
            />
          ))}{" "}
        </>
      )}

      <form onSubmit={handleSubmit(onValidSubmit)}>
        <input
          {...register("payload", { required: true })}
          type={"text"}
          placeholder={"Write comment"}
        ></input>
      </form>
    </CommentsContainer>
  );
};
