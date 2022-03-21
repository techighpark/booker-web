import { Link, useLocation } from "react-router-dom";
import { userLogIn } from "../apollo";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  SAuthInput,
  SAuthInputColumn,
  SAuthInputContainer,
} from "../component/Auth/SAuthInput";
import { SSubmitBtn } from "../component/Button/SSubmitBtn";
import { CAuthLayout } from "../component/Auth/CAuthLayout";
import loginImg from "../bgImg/45970011.JPG";
import { ErrorMessage } from "../component/Shared/ErrorMessage";
import { MiddleText } from "../component/Shared/MiddleText";
import { SBoldLink } from "../component/Link/SBoldLink";
import { LightText } from "../component/Shared/LightText";
import { SAppTitle } from "../component/Shared/SAppTitle";
import { PageTitle } from "../component/Shared/PageTitle";

const ImageColumn = styled.div`
  height: 400px;
  width: 600px;
  margin-right: 50px;
`;
const ImageBox = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center center;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = data => {
    const {
      login: { ok, token, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      userLogIn(token);
    }
  };

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = data => {
    if (loading) {
      return;
    }
    const { username, password } = data;
    loginMutation({ variables: { username, password } });
  };

  const clearResultError = () => {
    clearErrors("result");
  };

  return (
    <CAuthLayout>
      <PageTitle title={loading ? "Loading..." : `Login`} />
      <ImageColumn>
        <ImageBox src={loginImg}></ImageBox>
      </ImageColumn>
      <SAuthInputColumn>
        <SAppTitle>Booker</SAppTitle>
        <MiddleText>Log In to see books and authors.</MiddleText>
        <SAuthInputContainer>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <SAuthInput
              {...register("username", {
                required: "Please check your username and try again.",
                minLength: {
                  value: 5,
                  message: "The username should be more than 5 characters.",
                },
                onChange: () => clearResultError(),
              })}
              type={"text"}
              placeholder={"Username"}
            ></SAuthInput>
            <SAuthInput
              {...register("password", {
                required: "Sorry, your password was incorrect.",
                onChange: () => clearResultError(),
              })}
              type={"password"}
              placeholder={"Password"}
            ></SAuthInput>
            <SSubmitBtn
              type={"submit"}
              value={loading ? "Loading..." : "Log In"}
              disabled={!isValid || loading}
            />
          </form>
          <ErrorMessage hasError={errors?.result}>
            {errors?.result?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.username}>
            {errors?.username?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.password}>
            {errors?.password?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.username?.minLength}>
            {errors?.username?.minLength?.message}
          </ErrorMessage>
        </SAuthInputContainer>
        <LightText>Don't have an account?</LightText>
        <Link to="/signup">
          <SBoldLink>Sign up</SBoldLink>
        </Link>
      </SAuthInputColumn>
    </CAuthLayout>
  );
};
