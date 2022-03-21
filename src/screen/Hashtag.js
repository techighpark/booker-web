import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CAvatar } from "../component/Shared/CAvatar";
import { LayoutP } from "../component/Shared/LayoutP";
import { CPostGrid } from "../component/User/CPostGrid";
const Title = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
`;

const HeadContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 60%;
  margin-top: 50px;
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
  const { data: postData } = useQuery(SEE_HASHTAG_POST, {
    variables: { hashtag: `#${hashtag}` },
  });
  const { data: hashData } = useQuery(SEE_HASHTAG, {
    variables: { hashtag: `#${hashtag}` },
  });

  return (
    <LayoutP>
      <Title>Hashtag</Title>
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
