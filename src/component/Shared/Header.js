import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hook/useUser";
import { loggedInVar, userLogOut } from "../../apollo";
import { SAppTitle } from "./SAppTitle";
import { CAvatar } from "./CAvatar";
import { ThemeModeBtn } from "../Button/ThemeModeBtn";
import { Search } from "../Search";
import { CLogOutBtn } from "../Button/CLogOutBtn";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  padding: 30px 0px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderAppName = styled(SAppTitle)`
  font-size: 25px;
  margin: 0;
`;

export const Header = () => {
  const isLoggedIn = loggedInVar();
  const { data } = useUser();

  return (
    <Container>
      <Column>
        <HeaderAppName>
          <Link to={"/"}>Booker</Link>
        </HeaderAppName>
        {data === undefined ? null : (
          <Link to={`/user/${data?.me?.username}`}>
            <CAvatar url={data?.me?.avatar} avatarSize={"s"} />
          </Link>
        )}
      </Column>
      {data === undefined || data === null ? null : <Search />}
      <Column>
        <ThemeModeBtn />
        {isLoggedIn ? <CLogOutBtn /> : null}
      </Column>
    </Container>
  );
};
