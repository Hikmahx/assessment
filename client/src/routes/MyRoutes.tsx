import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound";
import FormLayout from "../components/layout/FormLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MyRoutes = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="" element={<FormLayout />}>
        <Route
          path="/login"
          element={userInfo ? <Navigate to="/" replace={true} /> : <Login />}
        />
        <Route
          path="/register"
          element={userInfo ? <Navigate to="/" replace={true} /> : <Register />}
        />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
