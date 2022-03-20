import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const THEME_MODE = "themeMode";
const TOKEN = "TOKEN";
export const POST_TAB = "PostTab";
export const AUTHOR_TAB = "AuthorTab";
export const BOOK_TAB = "BookTab";

export const loggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const themeModeVar = makeVar(Boolean(localStorage.getItem(THEME_MODE)));
export const ProfileTabVar = makeVar(POST_TAB);
export const popUpVar = makeVar(false);
export const popUpIdVar = makeVar();

export const onLightMode = () => {
  themeModeVar(false);
  localStorage.removeItem(THEME_MODE);
};

export const onDarkMode = () => {
  themeModeVar(true);
  localStorage.setItem(THEME_MODE, "Dark");
};

export const userLogIn = token => {
  localStorage.setItem(TOKEN, token);
  loggedInVar(true);
};

export const userLogOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
  // navigate("/", { replace: true });
};

export const popUpPost = (popUpId, id) => {
  popUpVar(true);
  popUpIdVar(id);
  localStorage.setItem("POPUP_ID", popUpId);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, token: localStorage.getItem(TOKEN) },
  };
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  defaultHttpLink: false,
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: obj => `Book:${obj.title}`,
      },
      User: {
        keyFields: obj => `User:${obj.username}`,
      },
      Author: {
        keyFields: obj => `Author:${obj.fullName}`,
      },
    },
  }),
});
