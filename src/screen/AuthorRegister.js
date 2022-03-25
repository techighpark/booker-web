import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AdminLayout } from "../component/Admin/AdminLayout";
import {
  SAuthInput,
  SAuthInputContainer,
  SInputText,
  SInputWrapper,
} from "../component/Auth/SAuthInput";
import { SSubmitBtn } from "../component/Button/SSubmitBtn";
import { STitle } from "../component/Shared/STitle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const PhotoPreview = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-sizing: border-box;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Photo = styled.img`
  height: ${props => props.resizedPhotoHeight};
  width: ${props => props.resizedPhotoWidth};
`;

const REGISTER_AUTHOR_MUTATION = gql`
  mutation registerAuthor(
    $fullName: String!
    $nationality: String
    $birth: String
    $photoProfile: Upload
  ) {
    registerAuthor(
      fullName: $fullName
      nationality: $nationality
      birth: $birth
      photoProfile: $photoProfile
    ) {
      ok
      error
    }
  }
`;

export const AuthorRegister = () => {
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [previewPhoto, setPrieviewPhoto] = useState();
  const [resizedPhotoHeight, setPhotoHeight] = useState();
  const [resizedPhotoWidth, setPhotoWidth] = useState();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const onCompleted = data => {
    const {
      registerAuthor: { ok },
    } = data;
    if (ok) {
      navigate("/admin");
    }
  };
  const [registerAuthorMutation] = useMutation(REGISTER_AUTHOR_MUTATION, {
    onCompleted,
  });

  const onValidSubmit = data => {
    const { fullName, nationality, birth, photoProfile } = data;
    registerAuthorMutation({
      variables: {
        fullName,
        nationality,
        birth,
        photoProfile: photoProfile[0],
      },
    });
  };
  const onChangePhoto = e => {
    const {
      target: {
        files: [file],
      },
    } = e;
    setSelectedPhoto(file);
  };

  const setPhoto = new Image();
  setPhoto.src = previewPhoto;
  setPhoto.onload = () => {
    const photoHeight = setPhoto.height;
    const photoWidth = setPhoto.width;
    if (photoHeight / photoWidth >= 1.5) {
      setPhotoHeight("140%");
      setPhotoWidth(photoWidth / (photoHeight / photoWidth));
    } else if (
      1.5 > photoHeight / photoWidth &&
      photoHeight / photoWidth >= 1
    ) {
      setPhotoHeight("100%");
      setPhotoWidth(photoWidth / (photoHeight / photoWidth));
    } else if (photoHeight / photoWidth < 1 && photoHeight / photoWidth > 0.5) {
      setPhotoHeight(photoHeight / (photoWidth / photoHeight));
      setPhotoWidth("100%");
    } else if (0.5 >= photoHeight / photoWidth) {
      setPhotoHeight(photoHeight / (photoWidth / photoHeight));
      setPhotoWidth("140%");
    }
  };
  useEffect(() => {
    if (!selectedPhoto) {
      setPrieviewPhoto(undefined);
      return;
    }
    const url = URL.createObjectURL(selectedPhoto);
    setPrieviewPhoto(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedPhoto]);
  return (
    <AdminLayout>
      <Container>
        <STitle>Author register</STitle>
        <PhotoPreview>
          <Photo
            src={previewPhoto}
            resizedPhotoHeight={resizedPhotoHeight}
            resizedPhotoWidth={resizedPhotoWidth}
          />
        </PhotoPreview>
        <SAuthInputContainer>
          <form onSubmit={handleSubmit(onValidSubmit)}>
            <SAuthInputContainer>
              <SInputWrapper>
                <SInputText>Profile photo</SInputText>
                <SAuthInput
                  {...register("photoProfile")}
                  type={"file"}
                  onChange={onChangePhoto}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Full name *</SInputText>
                <SAuthInput
                  {...register("fullName", { required: true })}
                  type={"text"}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Nation</SInputText>
                <SAuthInput
                  {...register("nationality")}
                  type={"text"}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Birth day</SInputText>
                <SAuthInput {...register("birth")} type={"text"}></SAuthInput>
              </SInputWrapper>
            </SAuthInputContainer>
            <SSubmitBtn type={"submit"}></SSubmitBtn>
          </form>
        </SAuthInputContainer>
      </Container>
    </AdminLayout>
  );
};
