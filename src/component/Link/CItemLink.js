import { Link } from "react-router-dom";
import styled from "styled-components";

const getFontSize = itemSize => {
  if (itemSize === "lg") {
    return "30px";
  } else if (itemSize === "s") {
    return "16px";
  } else if (itemSize === "xs") {
    return "12px";
  }
};
const getFontWeight = itemSize => {
  if (itemSize === "lg") {
    return "700";
  } else if (itemSize === "s") {
    return "600";
  } else if (itemSize === "xs") {
    return "500";
  }
};

const Item = styled.div`
  font-size: ${props => getFontSize(props.itemSize)};
  font-weight: ${props => getFontWeight(props.itemSize)};
  margin-left: 5px;
`;

export const CItemLink = ({ url, text, itemSize, book }) => {
  return (
    <Link to={`/${book ? "book" : "author"}/${url}`}>
      <Item itemSize={itemSize}>{text}</Item>
    </Link>
  );
};
