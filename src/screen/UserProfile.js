import { gql, useQuery, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { LayoutP } from "../component/Shared/LayoutP";
import { AUTHOR_TAB, BOOK_TAB, POST_TAB, ProfileTabVar } from "../apollo";
import { PostTab } from "../component/User/PostTab";
import { AuthorTab } from "../component/User/AuthorTab";
import { BookTab } from "../component/User/BookTab";
import { CAvatar } from "../component/Shared/CAvatar";
import { CUsername } from "../component/Shared/SUsername";
import { CTabButton } from "../component/User/CTabButton";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      email
      bio
      avatar
      posts {
        id
        photo
        totalLikes
        isLiked
        totalComments
      }
      followingAuthor {
        id
        fullName
        photoProfile
        totalFollower
        totalLikes
      }
      followingBook {
        id
        title
        bookCover
        author {
          fullName
        }
      }
      totalFollowerUser
      totalFollowingUser
      isFollowing
      totalFollowingBook
      totalFollowingAuthor
      isMe
    }
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: start;
  width: 800px;
  margin-top: 50px;
`;

const Column = styled.div`
  margin-left: 70px;
  width: 500px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
`;
const UsernameContainer = styled.div`
  width: 50%;
  margin-bottom: 40px;
`;

const FollowContainer = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
  width: 50%;
`;
const Following = styled.div``;
const Follower = styled.div``;
const Text = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 200;
`;

const ProfileBody = styled.div`
  width: 90%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: ${props => props.theme.button.bgColor};
  border-radius: 20px;
`;

const Button = styled.span`
  width: 150px;
  height: 100%;
`;

const LinkText = styled.div`
  width: 100px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: ${props => props.theme.link.accent.fontColor};
  color: ${props => props.theme.button.accent.fontColor};
  font-size: 14px;
  font-weight: 600;
  border-radius: 3px;
  &:hover {
    background-color: ${props => props.theme.link.accent.hoverFontColor};
    color: ${props => props.theme.button.accent.fontColor};
    font-weight: 700;
  }
`;

export const UserProfile = () => {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, { variables: { username } });
  const ProfileTab = useReactiveVar(ProfileTabVar);

  const getTab = (ProfileTab, profile) => {
    if (ProfileTab === POST_TAB) {
      return <PostTab {...profile} />;
    } else if (ProfileTab === AUTHOR_TAB) {
      return <AuthorTab {...profile} />;
    } else {
      return <BookTab {...profile} />;
    }
  };
  return (
    <LayoutP>
      <ProfileHeader>
        <CAvatar url={data?.seeProfile?.avatar} avatarSize={"lg"} />
        <Column>
          <Row>
            <UsernameContainer>
              <CUsername
                username={data?.seeProfile?.username}
                usernameSize={"lg"}
              />
            </UsernameContainer>
            <Button>
              {data?.seeProfile?.isMe ? (
                <Link to={"/account/edit"}>
                  <LinkText>Edit Profile</LinkText>
                </Link>
              ) : (
                "follow"
              )}
            </Button>
          </Row>
          <Row>
            <FollowContainer>
              <Following>
                {data?.seeProfile?.totalFollowingUser}
                <Text>following</Text>
              </Following>
            </FollowContainer>
            <FollowContainer>
              <Follower>
                {data?.seeProfile?.totalFollowerUser}
                <Text> followers</Text>
              </Follower>
            </FollowContainer>
          </Row>
          <Row>
            <FollowContainer>
              {data?.seeProfile?.totalFollowingAuthor}{" "}
              <Text>author following</Text>
            </FollowContainer>
            <FollowContainer>
              {data?.seeProfile?.totalFollowingBook}
              <Text> book following</Text>
            </FollowContainer>
          </Row>
        </Column>
      </ProfileHeader>
      <ProfileBody>
        <TabButtons>
          <CTabButton activeTab={POST_TAB} title={"Post"} />
          <CTabButton activeTab={AUTHOR_TAB} title={"Author"} />
          <CTabButton activeTab={BOOK_TAB} title={"Book"} />
        </TabButtons>
        <TabContainer>{getTab(ProfileTab, data?.seeProfile)}</TabContainer>
      </ProfileBody>
    </LayoutP>
  );
};
