import styled from "styled-components";
import { Header } from "../Shared/Header";

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 1000px;
`;

export const CAuthLayout = ({ children }) => {
  return (
    <SLayout>
      <Header />
      <Container>{children}</Container>
    </SLayout>
  );
};
