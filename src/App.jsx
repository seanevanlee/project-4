import { useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from "./pages/FeedPage/FeedPage";
// import ProfilePage from "./pages/ProfilePage/ProfilePage";

import userService from "./utils/userService";

export default function App() {
  const [user, setUser] = useState(userService.getUser()); // if theres a token, grab it, if not the value will be null

  // we need a function to pass down to LoginPage or the Signup page to be called after
  // the api request to login or sign up has been made
  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getUser, gets the jwt from localstorage and decodes it
  }
  function handleLogout() {

    console.log('being called')
    userService.logout();
    setUser(null);
  }
  if (user) {
// function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}/>
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      {/* <Route path="/:username" element={<ProfilePage loggedUser={user} handleLogout={handleLogout} />} /> */}
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
return (
<Routes>
<Route path="/" element={<HomePage />}/>
<Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
<Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
{/* <Route path="/:username" element={<ProfilePage loggedUser={user} handleLogout={handleLogout} />} /> */}
<Route path="/*" element={<Navigate to="/login" />} />
</Routes>
);
}

//pass down a function
// https://i.imgur.com/NK6Ofjs.jpg