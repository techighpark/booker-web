import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  SAuthInput,
  SAuthInputColumn,
  SAuthInputContainer,
} from "../component/Auth/SAuthInput";
import { SSubmitBtn } from "../component/Button/SSubmitBtn";
import { CAuthLayout } from "../component/Auth/CAuthLayout";
import { LightText } from "../component/Shared/LightText";
import { SBoldLink } from "../component/Link/SBoldLink";
import { ErrorMessage } from "../component/Shared/ErrorMessage";
import { SAppTitle } from "../component/Shared/SAppTitle";
import { PageTitle } from "../component/Shared/PageTitle";

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmitValid = data => {
    const { username, email, password } = data;
    createAccountMutation({ variables: { username, email, password } });
  };

  const onCompleted = data => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
    const { username, password } = getValues();
    if (ok) {
      navigate("/", { state: { username, password } });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted,
  });

  return (
    <CAuthLayout>
      <PageTitle title={loading ? "Loading..." : `Sign Up`} />

      <SAuthInputColumn>
        <SAppTitle>Booker</SAppTitle>
        <SAuthInputContainer>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <SAuthInput
              {...register("username", { required: "Username is required." })}
              type={"text"}
              placeholder={"Username"}
              hasError={Boolean(errors?.username)}
            ></SAuthInput>
            <SAuthInput
              {...register("email", { required: "Email is required." })}
              type={"text"}
              placeholder={"Email"}
              hasError={Boolean(errors?.email)}
            ></SAuthInput>
            <SAuthInput
              {...register("password", { required: "Password is required." })}
              type={"text"}
              placeholder={"Password"}
              hasError={Boolean(errors?.password)}
            ></SAuthInput>
            <SSubmitBtn
              type={"submit"}
              value={"Sign Up"}
              disabled={!isValid || loading}
            ></SSubmitBtn>
          </form>

          <ErrorMessage hasError={errors?.result}>
            {errors?.result?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.username}>
            {errors?.username?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.email}>
            {errors?.email?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.password}>
            {errors?.password?.message}
          </ErrorMessage>
        </SAuthInputContainer>
        <LightText>Have an account?</LightText>
        <Link to="/">
          <SBoldLink>Log In</SBoldLink>
        </Link>
      </SAuthInputColumn>
    </CAuthLayout>
  );
};
