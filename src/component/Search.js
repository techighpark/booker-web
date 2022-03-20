import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Input = styled.input`
  width: 300px;
  padding: 5px 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const SearchResults = styled.ul`
  /* margin-top: 20px; */
`;
const SearchUser = styled.li`
  width: 250px;
  padding: 7px 20px;
  border: 1px solid white;
  border-radius: 5px;
`;

// const SEARCH_QUERY = gql`
//   query searchAll($keyword: String!) {
//     searchAll(keyword: $keyword) {
//       users {
//         username
//         avatar
//       }
//       authors {
//         fullName
//         photoProfile
//       }
//       books {
//         title
//         bookCover
//         author {
//           fullName
//         }
//       }
//       hashtags {
//         hashtag
//       }
//     }
//   }
// `;

export const Search = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onSubmit",
  });
  // const onCompleted = data => {
  //   const { searchAll } = data;
  //   console.log("??");
  //   if (searchAll.length === 0) {
  //     setError("result", { message: "There is no nonono result." });
  //   }
  // };
  const onValidKeyUp = data => {
    // const { keyword } = data;
    // if (keyword) {
    //   searchUserQuery({ variables: { keyword } });
    // }
  };
  const onValidSubmit = data => {
    const { keyword } = data;
    if (keyword) {
      navigate("/search/result", { state: { keyword } });
    }
  };

  const clearResultError = () => {
    clearErrors("result");
  };

  // const [searchUserQuery, { data: searchData }] = useLazyQuery(SEARCH_QUERY, {
  //   // onCompleted,
  // });

  return (
    <Container>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <Input
          type={"text"}
          placeholder={`Search(how to use Icon?)`}
          {...register("keyword", {
            required: true,
            onChange: () => clearResultError(),
          })}
          onKeyUp={handleSubmit(onValidKeyUp)}
        />
      </form>
      <SearchResults></SearchResults>
    </Container>
  );
};
