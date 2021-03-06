import { gql, useQuery, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { LayoutP } from "../component/Shared/LayoutP";
import { AUTHOR_TAB, BOOK_TAB, POST_TAB, ProfileTabVar } from "../apollo";
import { CPostGrid } from "../component/User/CPostGrid";
import { AuthorTab } from "../component/User/AuthorTab";
import { BookTab } from "../component/User/BookTab";
import { CAvatar } from "../component/Shared/CAvatar";
import { CUsername } from "../component/Shared/CUsername";
import { CTabButton } from "../component/User/CTabButton";
import { FollowUSerBtn } from "../component/User/FollowUserBtn";
import { PageTitle } from "../component/Shared/PageTitle";
import { PageHeaderContainer } from "../component/Shared/PageHeader";
import { UsernameContainer } from "../component/Shared/ProfileUsername";

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
        totalBooks
        isLiked
        isFollowing
      }
      followingBook {
        id
        title
        bookCover
        author {
          fullName
        }
        totalLikes
        totalReviews
        totalFollower
        isLiked
        isFollowing
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

const Column = styled.div`
  margin-left: 70px;
  width: 400px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
`;

const UserBio = styled.div`
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.5;
`;

const FollowContainer = styled.div`
  margin-bottom: 12px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.span`
  /* width: 150px;
  height: 100%; */
`;
const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 0.5px solid ${props => props.theme.box.borderColor};
`;

const TabContainer = styled.div``;

const EditProfileBtn = styled.div`
  width: 100px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: ${props => props.theme.link.accent.fontColor};
  color: ${props => props.theme.primary.fontColor};
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.link.accent.hoverFontColor};
    color: ${props => props.theme.button.accent.fontColor};
    font-weight: 700;
  }
`;

export const UserProfile = () => {
  const { username } = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  const ProfileTab = useReactiveVar(ProfileTabVar);

  const getTab = (ProfileTab, profile) => {
    if (ProfileTab === POST_TAB) {
      return <CPostGrid posts={profile?.posts} />;
    } else if (ProfileTab === AUTHOR_TAB) {
      return <AuthorTab {...profile} />;
    } else {
      return <BookTab {...profile} />;
    }
  };
  return (
    <LayoutP>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <PageHeaderContainer>
        <Link to={"/account/edit"}>
          <CAvatar url={data?.seeProfile?.avatar} avatarSize={"lg"} />
        </Link>

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
                  <EditProfileBtn>Edit Profile</EditProfileBtn>
                </Link>
              ) : (
                <FollowUSerBtn
                  userId={data?.seeProfile?.id}
                  username={data?.seeProfile?.username}
                  isFollowing={data?.seeProfile?.isFollowing}
                />
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
          <Row>
            <UserBio>{data?.seeProfile?.bio}</UserBio>
          </Row>
        </Column>
      </PageHeaderContainer>
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
