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
import {
  SAuthInput,
  SAuthInputContainer,
  SInputText,
  SInputWrapper,
} from "../component/Auth/SAuthInput";
import { PageHeaderContainer } from "../component/Shared/PageHeader";
import { UsernameContainer } from "../component/Shared/ProfileUsername";

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
const HeaderContainer = styled(PageHeaderContainer)`
  justify-content: center;
`;
const EditUsernameContainer = styled(UsernameContainer)`
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  margin-left: 50px;
  margin-right: 30px;
  /* border: 1px solid; */
`;

const EditErrorMessage = styled(ErrorMessage).attrs({ as: "span" })`
  text-align: left;
`;

export const EditUserProfile = () => {
  const [selectedAvatar, setSeletectedAvatar] = useState("");
  const { data: userData } = useUser();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const { data: queryData, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username: userData?.me?.username },
  });
  const editProfileUpdate = (cache, result) => {
    const {
      data: {
        editProfile: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          avatar(prev) {
            return;
          },
        },
      });
      navigate(`/user/${userData?.me?.username}`);
    }
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
    update: editProfileUpdate,
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

      <HeaderContainer>
        {selectedAvatar ? (
          <CAvatar url={selectedAvatar} avatarSize={"lg"} />
        ) : (
          <CAvatar url={queryData?.seeProfile?.avatar} avatarSize={"lg"} />
        )}
        <EditUsernameContainer>
          <CUsername
            username={queryData?.seeProfile?.username}
            usernameSize={"lg"}
          />
        </EditUsernameContainer>
      </HeaderContainer>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <SAuthInputContainer>
          <SInputWrapper>
            <SInputText>Profile Photo</SInputText>
            <SAuthInput
              type="file"
              {...register("avatar")}
              onChange={onChange}
            />
          </SInputWrapper>
          <SInputWrapper>
            <SInputText>Username</SInputText>
            <SAuthInput
              type={"text"}
              placeholder={"Username"}
              {...register("username", { required: true })}
            ></SAuthInput>
          </SInputWrapper>
          <SInputWrapper>
            <SInputText>Email</SInputText>
            <SAuthInput
              type={"text"}
              placeholder={"Email"}
              {...register("email", { required: true })}
            ></SAuthInput>
          </SInputWrapper>
          <SInputWrapper>
            <SInputText>Bio</SInputText>
            <SAuthInput
              type={"text"}
              placeholder={"Bio"}
              {...register("bio")}
            ></SAuthInput>
          </SInputWrapper>
          <SInputWrapper>
            <SInputText>Password</SInputText>
            <SAuthInput
              type={"password"}
              placeholder={"Password"}
              {...register("password", {
                onChange: clearPasswordErrors,
              })}
            ></SAuthInput>
          </SInputWrapper>
          <SInputWrapper>
            <SInputText>Password Check</SInputText>
            <EditErrorMessage hasError={Boolean(errors?.password)}>
              {errors?.password?.message}
            </EditErrorMessage>
            <SAuthInput
              type={"password"}
              placeholder={"Password Check"}
              {...register("passwordCheck", {
                onChange: clearPasswordErrors,
              })}
            ></SAuthInput>
          </SInputWrapper>
          <SSubmitBtn type={"submit"} value={"Eidt Profile"} />
        </SAuthInputContainer>
      </form>
    </LayoutP>
  );
};
