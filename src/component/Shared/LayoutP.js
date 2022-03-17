import styled from "styled-components";
import { Header } from "./Header";

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LayoutP = ({ children }) => {
  return (
    <SLayout>
      <Header />
      <Container>{children}</Container>
    </SLayout>
  );
};
