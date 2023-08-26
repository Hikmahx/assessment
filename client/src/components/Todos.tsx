import React, { useEffect, useContext, useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import { RootState } from "../redux/store";
import Loading from "./Loading";

const Todos = () => {
  const { loading, error, errMessage } = useSelector(
    (state: RootState) => state.todo
  );

  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: "complete online JavaScript course",
      completed: true,
    },
    {
      id: 2,
      todo: "jog around the park 3x",
      completed: false,
    },
    {
      id: 3,
      todo: "10 minutes meditation",
      completed: false,
    },
    {
      id: 4,
      todo: "read for 1 hour",
      completed: true,
    },
    {
      id: 5,
      todo: "pick up groceries",
      completed: false,
    },
    {
      id: 6,
      todo: "complete Todo App on Frontend Mentor",
      completed: false,
    },
  ]);

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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
      :
      <div className="mt-16 lg:mt-20 lg:text-lg">
        <p className="text-center">{errMessage}</p>
        <p className="text-center">Please reload page</p>
      </div>
      }
      </>
    );

};

export default Todos