import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { UserLink } from "../UserLink";

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const CommentCaption = styled.div`
  margin-left: 10px;
  mark {
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

const Comment = ({ author, payload }) => {
  const sanitizedPayload = sanitizeHtml(
    payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
    { allowedTags: ["mark"] }
  );
  console.log(sanitizedPayload);
  return (
    <CommentContainer>
      <UserLink username={author} />
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: sanitizedPayload,
        }}
      />
    </CommentContainer>
  );
};
