import React from "react";
import pattern from "../../assets/pattern.svg";
import { Outlet } from "react-router-dom";

const FormLayout = () => {
  return (
    <div className="relative lg:h-screen bg-primary flex flex-col lg:flex-row">
      <div className="lg:flex-1 flex items-center lg:items-start relative">
        <img
          src={pattern}
          alt="background pattern"
          className="absolute inset-0 w-full h-full"
        />

        <h1 className="relative text-2xl lg:text-5xl font-bold text-white m-8 lg:mt-40 max-w-2xl flex justify-center w-full">
          StraitPay Todo List
        </h1>
      </div>
      <Outlet />
    </div>
  );
};

export default FormLayout;
