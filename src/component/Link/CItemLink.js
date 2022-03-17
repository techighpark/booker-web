import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-right: 10px;
`;
const Item = styled.div`
  font-weight: 600;
  color: ${props => props.theme.primary.fontColor};
  margin-left: 5px;
`;

export const CItemLink = ({ url, text, book }) => {
  return (
    <Container>
      {book ? "Title_" : "Author_"}
      <Link to={`/${book ? "book" : "author"}/${url}`}>
        <Item>{text}</Item>
      </Link>
    </Container>
  );
};
