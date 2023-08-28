import React, { useEffect } from "react";
import TodoItem from "../components/TodoItem";
import { RootState } from "../redux/store";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { removeError } from "../redux/reducers/authSlice";

const Todos = () => {
  const { loading, error, errMessage, todos } = useSelector(
    (state: RootState) => state.todo
  );
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(removeError());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!error ? (
        <div className="todo-container mx-6 pb-10 relative">
          {loading && (
            <div className="flex justify-center mx-auto mt-6 lg:mt-4">
              <Loading />
            </div>
          )}

          <div
            style={{ maxWidth: "34rem" }}
            className="mx-auto mt-7 text-xs sm:text-base lg:text-lg text-zinc-500"
          >
            {todos.length > 0 && (
              <ul className="w-full flex flex-col items-center relative bg-white transition-colors shadow-xl rounded overflow-hidden">
                {todos.map((todo) => (
                  <TodoItem key={todo._id} todo={todo} />
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-16 lg:mt-20 lg:text-lg relative">
          <p className="text-center truncate text-white">{errMessage}</p>
          {/* <p className="text-center">Please reload page</p> */}
        </div>
      )}
    </>
  );
};

export default Todos;
