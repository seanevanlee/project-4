import { useState, useEffect } from "react";
import * as postsAPI from "./utils/postApi";

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from "./pages/FeedPage/FeedPage";
// import ProfilePage from "./pages/ProfilePage/ProfilePage";

import userService from "./utils/userService";
import EditPostPage from "./pages/EditPostPage/EditPostPage";

export default function App() {
  const [user, setUser] = useState(userService.getUser()); // if theres a token, grab it, if not the value will be null
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // Feed page needs all of the posts to transform arrays into page display
  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts(response.data);
      //setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
      //setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  // we need a function to pass down to LoginPage or the Signup page to be called after
  // the api request to login or sign up has been made
  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getUser, gets the jwt from localstorage and decodes it
  }
  function handleLogout() {
    console.log("being called");
    userService.logout();
    setUser(null);
  }
  if (user) {
    // Find the route that matches with the browser, authenticated routes vs non-authenticated:
    return (
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage
              posts={posts}
              setPosts={setPosts}
              loggedUser={user}
              handleLogout={handleLogout}
            />
          }
        />
        {/* <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        /> */}
        <Route
          path="/posts/edit/:id"
          element={<EditPostPage posts={posts} setPosts={setPosts} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
        {/* <Route
          path="/*"
          element={<Redirect to="https://www.dota2.com/home" />}
        /> */}
      </Routes>
    );
  }
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      {/* <Route
        path="/:username"
        element={<ProfilePage loggedUser={user} handleLogout={handleLogout} />}
      /> */}
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

//pass down a function
// https://i.imgur.com/NK6Ofjs.jpg
