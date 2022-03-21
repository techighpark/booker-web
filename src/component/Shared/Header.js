import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hook/useUser";
import { SAppTitle } from "./SAppTitle";
import { CAvatar } from "./CAvatar";
import { ThemeModeBtn } from "../Button/ThemeModeBtn";
import { Search } from "../Search";
import { CLogOutBtn } from "../Button/CLogOutBtn";
import { CUploadBtn } from "../Button/CUploadBtn";
import { CRecommendBtn } from "../Button/CRecommendBtn";

const Container = styled.div`
  display: flex;
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

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = () => {
  const { data } = useUser();
  return (
    <Container>
      <Column>
        <HeaderAppName>
          <Link to={"/"}>Booker</Link>
        </HeaderAppName>
        <ThemeModeBtn />
      </Column>
      <Column>
        {data?.me === undefined || data?.me === null ? null : <Search />}
      </Column>
      <Column>
        {data?.me === undefined || data?.me === null ? null : (
          <UserContainer>
            <CRecommendBtn />
            <CUploadBtn />
            <CLogOutBtn />
            <Link to={`/user/${data?.me?.username}`}>
              <CAvatar url={data?.me?.avatar} avatarSize={"s"} />
            </Link>
          </UserContainer>
        )}
      </Column>
    </Container>
  );
};
