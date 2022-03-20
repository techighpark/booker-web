import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CUsername } from "../Shared/CUsername";

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const CommentCaption = styled.div`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.primary.accent.fontColor};
    cursor: pointer;
    font-size: 12px;
    font-weight: 300;
    &:hover {
      font-size: 14px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteBtn = styled.div`
  svg {
    &:hover {
      cursor: pointer;
      color: white;
    }
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
    }
  }
`;
export const Comment = ({ commentId, postId, author, payload, isMine }) => {
  const deleteCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${commentId}` });
      cache.modify({
        id: `Post:${postId}`,
        fields: {
          totalComments(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { commentId },
    update: deleteCommentUpdate,
  });
  return (
    <CommentContainer>
      <Column>
        <CUsername username={author} usernameSize={"xs"} />
        <CommentCaption>
          {payload.split(/(?=#| )/g).map((word, index) =>
            /#[\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtag/${word}`}>{word}</Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </CommentCaption>
      </Column>
      {isMine ? (
        <DeleteBtn onClick={deleteCommentMutation}>
          <FontAwesomeIcon icon={faXmark} size={"1x"} />
        </DeleteBtn>
      ) : null}
    </CommentContainer>
  );
};
