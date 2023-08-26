import { useContext } from "react";
import check from "../assets/icon-check.svg";
import pencil from "../assets/icon-pencil.svg";
import cross from "../assets/icon-cross.svg";

const TodoItem = ({ todo }: any) => {
  return (
    <li
      data-completed={todo.completed}
      data-id={todo.id}
      className="todo-item relative flex items-center h-12 lg:h-16 px-5 lg:px-6 pr-20 w-full border-b border-zinc-300"
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
            // onClick={checkBox}
            className={
              "checkbox absolute inset-0 bg-white transition-colors w-4 h-4 lg:w-5 lg:h-5 rounded-full m-auto" +
              (todo.completed === true ? " !bg-transparent" : "")
            }
          ></div>
        </div>
      </span>
      <p
        className={
          "todo-task relative px-3 lg:px-6 sm:max-w-sm z-10 first-letter:capitalize " +
          (todo.completed === true ? "line-through text-zinc-400 " : "text-zinc-700")
        }
      >
        {todo.todo}
      </p>
      <div className="action absolute inset-0 lg:opacity-0 lg:hover:opacity-100 mr-4 lg:mr-3 flex justify-end items-center">
        <img
          // onClick={updateTodo}
          src={pencil}
          alt="check-icon"
          className="w-4 h-4 lg:w-6 lg:h-6 m-2 lg:m-3 cursor-pointer"
        />
        <img
          // onClick={deleteTodo}
          src={cross}
          alt="check-icon"
          className="w-4 h-4 lg:w-6 lg:h-6 m-2 lg:m-3 cursor-pointer"
        />
      </div>
    </li>
  );
};

export default TodoItem;
