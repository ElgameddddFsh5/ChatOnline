import React, { useContext } from "react";
import Login from "./Pages/Login/Login";
import RegisterPage from "./Pages/Register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Profile from "./Pages/Profile/Profile";
import ProfileId from "./Pages/ProfileId/ProfileId";
import { AuthContext } from "./AuthContext";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      <Route path="/user/:profileID" element={<ProfileId />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
