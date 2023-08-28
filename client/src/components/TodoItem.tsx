import React, { useState } from "react";
import check from "../assets/icon-check.svg";
import pencil from "../assets/icon-pencil.svg";
import cross from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../redux/store";
import { deleteTodo, updateTodo } from "../redux/reducers/todoSlice";

const TodoItem = ({ todo }: any) => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.todo);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setUpdatedTodo(todo.todo); // Reset the form value
  };

  const handleUpdateTodo = () => {
    if (updatedTodo.length > 2) {
      dispatch(updateTodo({ id: todo._id, dataInfo: { todo: updatedTodo } }));
      setEditMode(false);
    }
  };

  return (
    <li
      data-completed={todo.completed}
      data-id={todo._id}
      className="todo-item relative flex items-center h-12 lg:h-16 px-5 lg:px-6 w-full border-b border-zinc-300"
    >
      <span className="checkbox-wrapper relative cursor-pointer z-10">
        <div
          className={
            "relative bg-zinc-400  hover:bg-stone-400 transition-colors rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center " +
            (todo.completed === true ? "bg-stone-600" : "")
          }
        >
          <img src={check} alt="check-icon" className="w-2 h-2 lg:w-3 lg:h-3" />
          <div
            onClick={() =>
              dispatch(
                updateTodo({
                  id: todo._id,
                  dataInfo: { completed: !todo.completed },
                })
              )
            }
            className={
              "checkbox absolute inset-0 bg-white transition-colors w-4 h-4 lg:w-5 lg:h-5 rounded-full m-auto" +
              (todo.completed === true ? " !bg-transparent" : "")
            }
          ></div>
        </div>
      </span>

      {editMode ? (
        // <form className="edit-form" >
        <input
          autoFocus
          className="relative mx-6 lg:px-6 sm:max-w-sm z-10 first-letter:capitalize focus:outline-offset-1"
          type="text"
          value={updatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)}
        />
      ) : (
        // </form>
        <p
          className={
            "todo-task relative px-3 lg:px-6 sm:max-w-sm z-10 first-letter:capitalize " +
            (todo.completed === true
              ? "line-through text-zinc-400 "
              : "text-zinc-700")
          }
        >
          {todo.todo}
        </p>
      )}
      <div
        className={`action ml-auto inset-0 lg:opacity-0 lg:hover:opacity-100 ${
          editMode && "!opacity-100"
        } flex justify-end items-center`}
      >
        {editMode ? (
          <>
            {/* <img
              onClick={handleUpdateTodo}
              src={check}
              alt="check-icon"
              className="w-4 h-4 lg:w-6 lg:h-6 m-2 lg:m-3 cursor-pointer"
            /> */}
            <span className="cursor-pointer" onClick={handleUpdateTodo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>

            <img
              onClick={handleCancelEdit}
              src={cross}
              alt="check-icon"
              className="w-4 h-4 lg:w-6 lg:h-6 m-2 lg:m-3 cursor-pointer"
            />
          </>
        ) : (
          <>
            <img
              onClick={handleEditClick}
              src={pencil}
              alt="check-icon"
              className="w-4 h-4 lg:w-6 lg:h-6 m-2 lg:m-3 cursor-pointer"
            />
            <img
              onClick={() => dispatch(deleteTodo(todo._id))}
              src={cross}
              alt="check-icon"
              className="w-4 h-4 lg:w-6 lg:h-6 m-2 lg:m-3 cursor-pointer"
            />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
