import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CAvatar } from "../component/Shared/CAvatar";
import { LayoutP } from "../component/Shared/LayoutP";
import { PageTitle } from "../component/Shared/PageTitle";
import { STitle } from "../component/Shared/STitle";
import { CPostGrid } from "../component/User/CPostGrid";

const HeadContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 60%;
  margin-top: 30px;
  margin-bottom: 70px;
`;
const HashtagContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
`;

const HashtagTitle = styled.div`
  font-size: 28px;
  font-weight: 400;
`;
const HashtagTotal = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
`;
const Text = styled.div`
  font-weight: 300;
  margin-left: 5px;
`;

const SEE_HASHTAG_POST = gql`
  query seeHashtagPost($hashtag: String!) {
    seeHashtagPost(hashtag: $hashtag) {
      id
      photo
      hashtags {
        totalPosts
      }
      isLiked
      totalLikes
      totalComments
    }
  }
`;

const SEE_HASHTAG = gql`
  query seeHashtag($hashtag: String!) {
    seeHashtag(hashtag: $hashtag) {
      totalPosts
    }
  }
`;
export const Hashtag = () => {
  const { hashtag } = useParams();
  const { data: postData, loading } = useQuery(SEE_HASHTAG_POST, {
    variables: { hashtag: `#${hashtag}` },
  });
  const { data: hashData } = useQuery(SEE_HASHTAG, {
    variables: { hashtag: `#${hashtag}` },
  });

  return (
    <LayoutP>
      <PageTitle title={loading ? "Loading..." : `#${hashtag} hashtag on`} />
      <STitle>Hashtag</STitle>
      <HeadContainer>
        <CAvatar url={postData?.seeHashtagPost[0]?.photo} avatarSize={"lg"} />
        <HashtagContainer>
          <HashtagTitle>#{hashtag}</HashtagTitle>
          <HashtagTotal>
            {hashData?.seeHashtag?.totalPosts}
            <Text>posts</Text>
          </HashtagTotal>
        </HashtagContainer>
      </HeadContainer>
      {/* <BodyContainer>
        <Grid>
          {postData?.seeHashtagPost?.map(post => (
            <Photo key={post.id} bg={post.photo}>
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {post.totalLikes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {post.totalComments}
                </Icon>
              </Icons>
            </Photo>
          ))}
        </Grid>
      </BodyContainer> */}
      <CPostGrid posts={postData?.seeHashtagPost} />
    </LayoutP>
  );
};
