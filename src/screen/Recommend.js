import { gql, useQuery } from "@apollo/client";
import { LayoutP } from "../component/Shared/LayoutP";
import styled from "styled-components";
import {
  faUser as fasUser,
  faHeart as fasHeart,
  faFileAlt,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageTitle } from "../component/Shared/PageTitle";
import { STitle } from "../component/Shared/STitle";
import { Description } from "./UploadPost";

const RECOMMEND_QUERY = gql`
  query recommend {
    recommend {
      users {
        id
        username
        avatar
        isFollowing
      }
      authors {
        id
        fullName
        photoProfile
        isFollowing
        isLiked
      }
      books {
        id
        title
        bookCover
        isFollowing
        isLiked
      }
    }
  }
`;

const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-auto-rows: 20em;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
const Photo = styled.div`
  position: relative;
  width: 20em;
  background-image: url(${props => props.bg});
  background-size: cover;
  border: 0.1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
const ItemIdentification = styled.div`
  position: absolute;
  top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  width: 100%;
`;

const ItemName = styled.div``;
const ItemType = styled.div``;

const PhotoIcons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0px 10px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
export const Recommend = () => {
  const { data, loading } = useQuery(RECOMMEND_QUERY);
  const recommendArray = data?.recommend?.authors?.concat(
    data?.recommend?.books,
    data?.recommend?.users
  );

  const randomRecommend = recommendArray?.sort(() => Math.random() - 0.5);

  const getItemType = item => {
    if (item.__typename === "Author") {
      return faPencil;
    } else if (item.__typename === "Book") {
      return faFileAlt;
    } else {
      return fasUser;
    }
  };
  return (
    <LayoutP>
      <PageTitle title={loading ? "Loading..." : `Recommendation`} />
      <STitle>Recommendation</STitle>
      <Description>Based on your Author, Book, User</Description>
      <Grid>
        {randomRecommend?.map(item => {
          return (
            <Photo
              key={item.title || item.fullName || item.username}
              bg={item.bookCover || item.photoProfile || item.avatar}
            >
              <ItemIdentification>
                <ItemType>
                  <FontAwesomeIcon icon={getItemType(item)} size={"xs"} />
                </ItemType>
                <ItemName>
                  {item.title || item.fullName || item.username}
                </ItemName>
              </ItemIdentification>
              <PhotoIcons>
                <Icon>
                  <FontAwesomeIcon
                    icon={item?.isFollowing ? fasUser : faUser}
                  />
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={item?.isLiked ? fasHeart : faHeart} />
                </Icon>
              </PhotoIcons>
            </Photo>
          );
        })}
      </Grid>
    </LayoutP>
  );
};
