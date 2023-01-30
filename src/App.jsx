import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";


export default function App() {{
  // const [user, setUser] = useState(userService.getUser());
  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }}
// function App() {
  return (
    <Routes>
      <Route path="/" element={<Image src="https://i.imgur.com/NK6Ofjs.jpg" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

