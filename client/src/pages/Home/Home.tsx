import React from "react";
import InputForm from "../../components/InputForm";
import Todos from "../../components/Todos";

const Home = () => {
  return (
    <div className="bg-primary min-h-screen py-12">
      <h1 className="text-2xl lg:text-5xl font-bold text-white py-8 mx-auto text-center">
        StraitPay Todo List
      </h1>
      <InputForm />
      <Todos />
    </div>
  );
};

export default Home;
