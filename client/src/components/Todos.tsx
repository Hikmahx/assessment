import React, { useEffect, useContext, useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import { RootState } from "../redux/store";
import Loading from "./Loading";

const Todos = () => {
  const { loading, error, errMessage, todos } = useSelector(
    (state: RootState) => state.todo
  );


    return (
      <>
      {!error ?

      <div className="todo-container mx-6 pb-10">
        {loading && (
          <div className="flex justify-center mx-auto mt-6 lg:mt-4">
            <Loading />
          </div>
        )}

        <div
          style={{ maxWidth: "34rem" }}
          className="mx-auto mt-7 text-xs sm:text-base lg:text-lg text-zinc-500"
        >
          <ul className="w-full flex flex-col items-center relative bg-white transition-colors shadow-xl rounded overflow-hidden">
            {todos.map((todo) => (
              <TodoItem todo={todo} />
            ))}
          </ul>
        </div>
      </div>
      :
      <div className="mt-16 lg:mt-20 lg:text-lg">
        <p className="text-center truncate">{errMessage}</p>
        <p className="text-center">Please reload page</p>
      </div>
      }
      </>
    );

};

export default Todos