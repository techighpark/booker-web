import { ThemeProvider } from "styled-components";
import { darkMode, GlobalStyle, lightMode } from "./themeStyles";
import { useReactiveVar } from "@apollo/client";
import { loggedInVar, themeModeVar } from "./apollo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./screen/Home";
import { Login } from "./screen/Login";
import { SignUp } from "./screen/SignUp";
import { AuthorProfile } from "./screen/AuthorProfile";
import { BookProfile } from "./screen/BookProfile";
import { UserProfile } from "./screen/UserProfile";
import { SearchResult } from "./screen/SearchResult";
import { EditUserProfile } from "./screen/EditUserProfile";
import { Test } from "./screen/Test";

function App() {
  const themeMode = useReactiveVar(themeModeVar);
  const isLoggedIn = useReactiveVar(loggedInVar);
  return (
    <ThemeProvider theme={themeMode ? darkMode : lightMode}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/author/:fullName" element={<AuthorProfile />} />
          <Route path="/book/:id" element={<BookProfile />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/account/edit" element={<EditUserProfile />} />
          <Route path="/search/result" element={<SearchResult />} />
          {/* <Route path="/hashtags/:hashtag" element={<EditUserProfile />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
