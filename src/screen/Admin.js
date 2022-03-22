import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdminLayout } from "../component/Admin/AdminLayout";
const Column = styled.div``;

const RegisterBtn = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${props => (props.Author ? "#3b3b8c" : "#DB7C5E")};
  text-align: center;
  line-height: 100px;
  cursor: pointer;
  &:hover {
    font-weight: 500;
    background-color: ${props => (props.Author ? "#313173" : "#BD6A51")};
  }
`;

export const Admin = () => {
  const navigate = useNavigate();
  const onRegisterClick = value => {
    navigate(`${value}`);
  };
  return (
    <AdminLayout>
      <Column>
        <RegisterBtn Author onClick={() => onRegisterClick("author")}>
          Author register
        </RegisterBtn>
        <RegisterBtn onClick={() => onRegisterClick("book")}>
          Book register
        </RegisterBtn>
      </Column>
      <Column>
        <RegisterBtn Author onClick={() => onRegisterClick("author_list")}>
          Author list
        </RegisterBtn>
        <RegisterBtn onClick={() => onRegisterClick("book_list")}>
          Book list
        </RegisterBtn>
      </Column>
    </AdminLayout>
  );
};
