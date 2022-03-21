import { gql, useQuery } from "@apollo/client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { popUpVar } from "../../apollo";
import { Post } from "../Feed/Post";
import { DeletePostBtn } from "./DeletePostBtn";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 30px;
  width: 600px;
  height: 100%;
  max-height: 800px;
  background-color: rgba(0, 0, 0, 0.8);
`;
const CloseBtn = styled.span`
  position: absolute;
  margin: 20px;
  top: 0px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const PopupDeleteAlert = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 180px;
`;
const PopupDeleteText = styled.div`
  margin-top: 30px;
  font-weight: 500;
`;
const AlertVerifyBtn = styled.span`
  display: block;
  margin: 20px 0px;
  width: 60px;
  padding: 10px;
  text-align: center;
  border: 1.5px solid;
  box-sizing: border-box;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover {
    color: white;
    border: 1.5px solid white;
    box-sizing: border-box;
  }
`;

const SEE_POST_QUERY = gql`
  query seePost($postId: Int!) {
    seePost(postId: $postId) {
      id
      photo
      isMine
      user {
        username
        avatar
      }
      book {
        id
        title
        author {
          fullName
        }
      }
      isLiked
      totalLikes
      caption
      hashtags {
        id
        hashtag
      }
      totalComments
      comments {
        id
        payload
        isMine
        user {
          username
          avatar
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const PopupPost = ({ popUp, postId }) => {
  const [popUpDeleted, setPopUpDeleted] = useState(false);
  const { data, loading } = useQuery(SEE_POST_QUERY, {
    variables: { postId },
  });
  const onClick = () => {
    popUpVar(false);
  };

  const onVerifyClick = () => {
    setPopUpDeleted(false);
    popUpVar(false);
  };

  const post = data?.seePost;
  return popUp ? (
    <Container>
      {popUpDeleted ? (
        <PopupDeleteAlert>
          <PopupDeleteText>Post deleted</PopupDeleteText>
          <AlertVerifyBtn onClick={onVerifyClick}>Ok</AlertVerifyBtn>
        </PopupDeleteAlert>
      ) : (
        <Inner>
          <CloseBtn onClick={onClick}>
            <FontAwesomeIcon icon={faClose} size={"1x"} />
          </CloseBtn>
          {post?.isMine ? (
            <DeletePostBtn postId={postId} setPopUpDeleted={setPopUpDeleted} />
          ) : (
            ""
          )}
          {loading ? "Loading" : <Post {...post} />}
        </Inner>
      )}
    </Container>
  ) : (
    ""
  );
};
