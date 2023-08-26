import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
// import Layout from "../components/layout/Layout";
import NotFound from "../pages/NotFound";
import FormLayout from "../components/layout/FormLayout";
// import { useSelector } from "react-redux";

const MyRoutes = () => {
  const user = false;

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/"
        element={!user ? <Navigate to="/login" replace={true} /> : <Home />}
      />
    <Route path="" element={<FormLayout />}>

      <Route
        path="/login"
        element={user ? <Navigate to="/" replace={true} /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace={true} /> : <Register />}
      />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
