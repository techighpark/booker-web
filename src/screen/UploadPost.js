import { LayoutP } from "../component/Shared/LayoutP";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { SSubmitBtn } from "../component/Button/SSubmitBtn";
import { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import useUserProfile from "../hook/useUserProfile";
import { ErrorMessage } from "../component/Shared/ErrorMessage";
import { useNavigate } from "react-router-dom";
import useUser from "../hook/useUser";
import { POST_FRAGMENT } from "../fragment";
import { PageTitle } from "../component/Shared/PageTitle";
import { STitle } from "../component/Shared/STitle";

const ContainerName = styled.div`
  width: 150px;
`;
export const Description = styled.div`
  color: ${props => props.theme.secondary.fontColor};
`;

const Container = styled.div`
  display: flex;
  margin: 50px 0px;
  width: 100%;
  justify-content: center;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const PhotoPreview = styled.div`
  width: 600px;
  height: 600px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-sizing: border-box;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Photo = styled.img`
  height: ${props => props.resizedPhotoHeight};
  width: ${props => props.resizedPhotoWidth};
`;
const PhotoInput = styled.input`
  display: flex;
  width: 100%;
  font-size: 12px;
  color: ${props => props.theme.secondary.fontColor};
`;

const CaptionInput = styled.input`
  width: 100%;
  height: 100px;
  font-size: 12px;
  text-align: center;
  color: ${props => props.theme.primary.fontColor};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  &::placeholder {
    color: ${props => props.theme.secondary.fontColor};
  }
  &:focus {
    border: 1px solid orange;
    box-sizing: border-box;
  }
`;

export const BookInput = styled.select`
  width: 100%;
  height: 20px;
  font-size: 12px;
  text-align: center;
  background-color: ${props => props.theme.primary.bgColor};
  color: ${props => props.theme.secondary.fontColor};
  border: 0.5px solid
    ${props => (props.hasError ? "red" : "rgba(255, 255, 255, 0.2)")};
  &:focus {
    border: 1px solid orange;
    box-sizing: border-box;
  }
`;

const UPLOAD_POST_MUTATION = gql`
  mutation uploadPost($photo: Upload!, $caption: String, $bookId: Int!) {
    uploadPost(photo: $photo, caption: $caption, bookId: $bookId) {
      ok
      id
      error
    }
  }
`;

const SEE_AUTHOR_QUERY = gql`
  query seeAuthor($fullName: String!) {
    seeAuthor(fullName: $fullName) {
      books {
        id
        title
      }
    }
  }
`;

export const UploadPost = () => {
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [previewPhoto, setPrieviewPhoto] = useState();
  const [resizedPhotoHeight, setPhotoHeight] = useState();
  const [resizedPhotoWidth, setPhotoWidth] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const { data: userProfile } = useUserProfile();
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onValidSubmit = data => {
    const { photo, caption, bookId } = data;
    if (bookId === "--- Select Book ---") {
      setError("select", { message: "Select book please" });
    }
    uploadPostMutation({
      variables: { photo: photo[0], caption, bookId: parseInt(bookId) },
    });
  };

  const uploadPostUpdate = (cache, result) => {
    const {
      data: {
        uploadPost: { ok, error, id },
      },
    } = result;
    if (!ok) {
      setError("result", { message: error });
    } else {
      const newPostRef = cache.writeFragment({
        id: `Post:${id}`,
        fragment: POST_FRAGMENT,
      });
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          posts(prev) {
            return [newPostRef, ...prev];
          },
        },
      });
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev) {
            return [newPostRef, ...prev];
          },
        },
      });
      navigate(`/user/${userData?.me?.username}`);
    }
  };
  const [uploadPostMutation, { loading }] = useMutation(UPLOAD_POST_MUTATION, {
    update: uploadPostUpdate,
  });
  const [seeAuthorQuery, { data: authorData }] = useLazyQuery(SEE_AUTHOR_QUERY);
  const onSelectedAuthor = data => {
    const {
      target: { value },
    } = data;
    seeAuthorQuery({ variables: { fullName: value } });
  };
  const onSelectedBook = data => {
    const {
      target: { selectedIndex },
    } = data;
    if (selectedIndex !== 0) {
      setIsSelect(true);
    }
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

  const clearPostError = () => {
    clearErrors(["result", "select"]);
  };

  const onChangePhoto = e => {
    const {
      target: {
        files: [file],
      },
    } = e;
    setSelectedPhoto(file);
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
  console.log(isValid);
  console.log(errors);
  return (
    <LayoutP>
      <PageTitle title={loading ? "Loading..." : "Create new Post"} />
      <STitle>Upload Your Post</STitle>
      <Description>
        Upload photo related with your following authors and books only once
        possible.
      </Description>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <PhotoPreview>
          <Photo
            src={previewPhoto}
            resizedPhotoHeight={resizedPhotoHeight}
            resizedPhotoWidth={resizedPhotoWidth}
          />
        </PhotoPreview>
        <Container>
          <ContainerName>Photo Select</ContainerName>
          <PhotoInput
            type={"file"}
            {...register("photo", { required: true, onChange: clearPostError })}
            onChange={onChangePhoto}
          />
        </Container>
        <Container>
          <ContainerName>Caption</ContainerName>
          <CaptionInput
            type={"textarea"}
            placeholder={"Write caption"}
            {...register("caption", { onChange: clearPostError })}
          />
        </Container>
        <Container>
          <ContainerName>Author Select</ContainerName>
          <BookInput
            {...register("author", {
              required: true,
            })}
            onChange={onSelectedAuthor}
            onClick={clearPostError}
          >
            <option>--- Select Book ---</option>
            {userProfile?.seeProfile?.followingAuthor?.map(author => (
              <option key={author.id} value={author.fullName}>
                {author.fullName}
              </option>
            ))}
          </BookInput>
        </Container>
        {authorData ? (
          <Container>
            <ContainerName>Book Select</ContainerName>
            <BookInput
              {...register("bookId")}
              hasError={errors?.select || errors?.result}
              onChange={onSelectedBook}
              onClick={clearPostError}
            >
              <option>--- Select Book ---</option>
              {authorData?.seeAuthor?.books?.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </BookInput>
          </Container>
        ) : null}
        <BottomContainer>
          <ErrorMessage hasError={errors?.result}>
            {errors?.result?.message}
          </ErrorMessage>
          <ErrorMessage hasError={errors?.select}>
            {errors?.select?.message}
          </ErrorMessage>
          <SSubmitBtn
            type={"submit"}
            value={"Upload"}
            disabled={!isValid || !isSelect}
          />
        </BottomContainer>
      </form>
    </LayoutP>
  );
};
