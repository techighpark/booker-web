import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Input = styled.input`
  position: relative;
  width: 250px;
  padding: 5px 10px;
  border: 1px solid gray;
  &::placeholder {
    padding-left: 10px;
    font-size: 10px;
  }
`;

export const Search = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, clearErrors } = useForm({
    mode: "onSubmit",
  });

  const onValidSubmit = data => {
    const { keyword } = data;
    if (keyword) {
      navigate("/search/result", { state: { keyword } });
    }
  };

  const clearResultError = () => {
    clearErrors("result");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <Input
          type={"text"}
          placeholder={`Search`}
          {...register("keyword", {
            required: true,
            onChange: () => clearResultError(),
          })}
        ></Input>
      </form>
    </Container>
  );
};
