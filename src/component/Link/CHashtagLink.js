import { Link } from "react-router-dom";

export const CHashtagLink = ({ hashtag }) => {
  const url = hashtag?.replace("#", "");
  return <Link to={`/hashtags/${url}`}>{hashtag}</Link>;
};
