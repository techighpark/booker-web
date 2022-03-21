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
import { UploadPost } from "./screen/UploadPost";
import { Hashtag } from "./screen/Hashtag";
// import { Following } from "./screen/Following";
import { Recommend } from "./screen/Recommend";
import { HelmetProvider } from "react-helmet-async";
import { Admin } from "./screen/Admin";

function App() {
  const themeMode = useReactiveVar(themeModeVar);
  const isLoggedIn = useReactiveVar(loggedInVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={themeMode ? darkMode : lightMode}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/author/:fullName" element={<AuthorProfile />} />
            <Route path="/book/:id" element={<BookProfile />} />
            <Route path="/account/edit" element={<EditUserProfile />} />
            <Route path="/account/upload" element={<UploadPost />} />
            <Route path="/search/result" element={<SearchResult />} />
            <Route path="/hashtags/:hashtag" element={<Hashtag />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/following" element={<Following />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
