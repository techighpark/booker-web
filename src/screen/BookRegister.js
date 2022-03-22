import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import useAuthorList from "../hook/useAuthorList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const AuthorSelect = styled(SAuthInput).attrs({ as: "select" })``;

const REGISTER_BOOK_MUTATION = gql`
  mutation registerBook(
    $title: String!
    $subtitle: String
    $publishedAt: String
    $bookCover: Upload
    $authorName: String!
  ) {
    registerBook(
      title: $title
      subtitle: $subtitle
      publishedAt: $publishedAt
      bookCover: $bookCover
      authorName: $authorName
    ) {
      ok
      error
    }
  }
`;

export const BookRegister = () => {
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [previewPhoto, setPrieviewPhoto] = useState();
  const [resizedPhotoHeight, setPhotoHeight] = useState();
  const [resizedPhotoWidth, setPhotoWidth] = useState();
  const { data: authorListData } = useAuthorList();

  const { register, handleSubmit } = useForm();
  const onCompleted = data => {
    console.log(data);
  };
  const [registerAuthorMutation] = useMutation(REGISTER_BOOK_MUTATION, {
    onCompleted,
  });

  const onValidSubmit = data => {
    const { title, subtitle, publishedAt, bookCover, authorName } = data;
    registerAuthorMutation({
      variables: {
        title,
        subtitle,
        publishedAt,
        bookCover: bookCover[0],
        authorName,
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
        <STitle>Book register</STitle>
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
                <SInputText>Book Cover</SInputText>
                <SAuthInput
                  {...register("bookCover")}
                  type={"file"}
                  onChange={onChangePhoto}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Title *</SInputText>
                <SAuthInput
                  {...register("title", { required: true })}
                  type={"text"}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Subtitle</SInputText>
                <SAuthInput
                  {...register("subtitle")}
                  type={"text"}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Published</SInputText>
                <SAuthInput
                  {...register("publishedAt")}
                  type={"text"}
                ></SAuthInput>
              </SInputWrapper>
              <SInputWrapper>
                <SInputText>Author *</SInputText>
                <AuthorSelect {...register("authorName")} type={"text"}>
                  <option>--Please choose an author--</option>
                  {authorListData?.seeAuthors?.map(author => (
                    <option key={author.id} value={author.fullName}>
                      {author.fullName}
                    </option>
                  ))}
                </AuthorSelect>
              </SInputWrapper>
            </SAuthInputContainer>
            <SSubmitBtn type={"submit"}></SSubmitBtn>
          </form>
        </SAuthInputContainer>
      </Container>
    </AdminLayout>
  );
};
