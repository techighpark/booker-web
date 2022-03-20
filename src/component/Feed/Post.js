import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { CItemLink } from "../Link/CItemLink";
import { CAvatar } from "../Shared/CAvatar";
import { SharedBox } from "../Shared/SharedBox";
import { Comments } from "./Comments";
import { Link } from "react-router-dom";
import { CUsername } from "../Shared/CUsername";

const PostHeader = styled.div`
  margin: 15px 0px;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BookAuthorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-top: 15px;
  font-size: 12px;
  color: ${props => props.theme.secondary.fontColor};
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
const PostBottom = styled.div`
  margin: 15px;
  display: flex;
  /* width: 100%; */
  flex-direction: column;
  align-items: flex-start;
`;

const Photo = styled.img`
  min-width: 100%;
  max-height: 600px;
  object-fit: cover;
`;

const LikeBtn = styled.div`
  color: ${props => props.theme.button.accent.fontColor};
  font-size: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover {
    color: ${props => props.theme.button.hoverBgColor};
    cursor: pointer;
  }
`;
const TotalLikes = styled.div`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5;
  margin: 8px 0px 12px 0px;
`;

const TOGGLE_POST_LIKE_MUTATION = gql`
  mutation togglePostLike($postId: Int!) {
    togglePostLike(postId: $postId) {
      id
      ok
      error
    }
  }
`;

export const Post = ({
  id,
  photo,
  isLiked,
  totalLikes,
  caption,
  user,
  book,
  comments,
  totalComments,
}) => {
  const updateTogglePostLikeMutation = (cache, result) => {
    const {
      data: {
        togglePostLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Post:${id}`;
      const fragment = gql`
        fragment PostLike on Post {
          isLiked
          totalLikes
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment: fragment,
      });
      if ("isLiked" in result && "totalLikes" in result) {
        const { isLiked: cacheIsLiked, totalLikes: cacheTotalLikes } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment: fragment,
          data: {
            isLiked: !cacheIsLiked,
            totalLikes: cacheIsLiked
              ? cacheTotalLikes - 1
              : cacheTotalLikes + 1,
          },
        });
      }
    }
  };

  const [togglePostLikeMutation] = useMutation(TOGGLE_POST_LIKE_MUTATION, {
    variables: { postId: id },
    update: updateTogglePostLikeMutation,
  });
  return (
    <SharedBox>
      <PostHeader>
        <UserContainer>
          <Link to={`/user/${user.username}`}>
            <CAvatar url={user.avatar} avatarSize={"xs"} />
          </Link>
          <CUsername username={user.username} />
        </UserContainer>
        <BookAuthorContainer>
          <ItemContainer>
            title_
            <CItemLink url={book.id} text={book.title} book itemSize={"xs"} />
          </ItemContainer>
          <ItemContainer>
            author_
            <CItemLink
              url={book.author.fullName}
              text={book.author.fullName}
              itemSize={"xs"}
            />
          </ItemContainer>
        </BookAuthorContainer>
      </PostHeader>
      <Photo src={photo} />
      <PostBottom>
        <LikeBtn onClick={togglePostLikeMutation}>
          <FontAwesomeIcon
            icon={isLiked ? fasHeart : faHeart}
            size={"1x"}
            color={isLiked ? "red" : ""}
          />
        </LikeBtn>
        <TotalLikes>
          {totalLikes === 1 ? "1 like" : `${totalLikes} likes`}
        </TotalLikes>
        <Comments
          postId={id}
          author={user.username}
          caption={caption}
          totalComments={totalComments}
          comments={comments}
        />
      </PostBottom>
    </SharedBox>
  );
};
