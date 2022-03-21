import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LayoutP } from "../component/Shared/LayoutP";
import useUser from "../hook/useUser";
import { SSubmitBtn } from "../component/Button/SSubmitBtn";
import { ErrorMessage } from "../component/Shared/ErrorMessage";
import { CAvatar } from "../component/Shared/CAvatar";
import { CUsername } from "../component/Shared/CUsername";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../component/Shared/PageTitle";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      email
      avatar
      bio
    }
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;
const UserContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
`;
const UsernameContainer = styled.div`
  width: 50%;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 400px; */
  width: 400px;
  margin-top: 50px;
`;

const InputWrapper = styled.div`
  margin-bottom: 30px;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-top: 10px;
`;
const InputText = styled.span`
  font-weight: 700;
  font-size: 16px;
  display: inline-block;
  margin-right: 20px;
`;
const EditErrorMessage = styled(ErrorMessage).attrs({ as: "span" })`
  text-align: left;
`;

export const EditUserProfile = () => {
  const [selectedAvatar, setSeletectedAvatar] = useState("");
  const { data: userData } = useUser();
  const navigate = useNavigate();
  console.log(userData);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { data: queryData, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username: userData?.me?.username },
  });
  const onCompleted = data => {
    navigate(`/user/${userData?.me?.username}`);
  };
  const onValidSubmit = data => {
    const { username, email, bio, password, passwordCheck, avatar } = data;
    if (password !== passwordCheck) {
      return setError("password", { message: "Check the password" });
    }
    editProfileMutation({
      variables: { username, email, bio, password, avatar: avatar[0] },
    });
  };
  const [editProfileMutation] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const clearPasswordErrors = () => {
    clearErrors("password");
  };

  useEffect(() => {
    setValue("username", queryData?.seeProfile?.username);
    setValue("email", queryData?.seeProfile?.email);
    setValue("bio", queryData?.seeProfile?.bio);
  }, [loading]);

  const onChange = e => {
    const {
      target: {
        files: [file],
      },
    } = e;
    const url = URL.createObjectURL(file);
    setSeletectedAvatar(url);
  };
  return (
    <LayoutP>
      <PageTitle title={loading ? "Loading..." : `Edit Profile`} />

      <UserContainer>
        {selectedAvatar ? (
          <CAvatar url={selectedAvatar} avatarSize={"lg"} />
        ) : (
          <CAvatar url={queryData?.seeProfile?.avatar} avatarSize={"lg"} />
        )}
        <UsernameContainer>
          <CUsername
            username={queryData?.seeProfile?.username}
            usernameSize={"lg"}
          />
        </UsernameContainer>
      </UserContainer>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <InputContainer>
          <InputWrapper>
            <InputText>Profile Photo</InputText>
            <Input type="file" {...register("avatar")} onChange={onChange} />
          </InputWrapper>
          <InputWrapper>
            <InputText>Username</InputText>
            <Input
              type={"text"}
              placeholder={"Username"}
              {...register("username", { required: true })}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <InputText>Email</InputText>
            <Input
              type={"text"}
              placeholder={"Email"}
              {...register("email", { required: true })}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <InputText>Bio</InputText>
            <Input
              type={"text"}
              placeholder={"Bio"}
              {...register("bio")}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <InputText>Password</InputText>
            <Input
              type={"password"}
              placeholder={"Password"}
              {...register("password", {
                onChange: clearPasswordErrors,
              })}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <InputText>Password Check</InputText>
            <EditErrorMessage hasError={Boolean(errors?.password)}>
              {errors?.password?.message}
            </EditErrorMessage>
            <Input
              type={"password"}
              placeholder={"Password Check"}
              {...register("passwordCheck", {
                onChange: clearPasswordErrors,
              })}
            ></Input>
          </InputWrapper>
          <SSubmitBtn type={"submit"} value={"Eidt Profile"} />
        </InputContainer>
      </form>
    </LayoutP>
  );
};
