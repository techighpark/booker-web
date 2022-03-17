import { useLocation } from "react-router-dom";
import { LayoutP } from "../component/Shared/LayoutP";

export const SearchResult = () => {
  const location = useLocation();

  const {
    state: { authors, books, hashtags, users },
  } = location;
  return <LayoutP>result</LayoutP>;
};
