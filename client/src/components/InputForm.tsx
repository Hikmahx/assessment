import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../redux/store";
import { addTodo } from "../redux/reducers/todoSlice";

const InputForm = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  type FormValues = {
    newTodo: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      addTodo({
        todo: data.newTodo,
        completed: false,
      })
    );
    reset();
  };

  return (
    <div className="form-wrapper mx-6 relative">
      <div
        style={{ maxWidth: "34rem", top: "0.1rem" }}
        className="relative mx-auto h-12 lg:h-16 bg-white transition-colors rounded flex items-center"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-5 lg:mx-6 flex items-center"
        >
          <span className="relative cursor-pointer font-bold text-primary text-3xl">
            +
          </span>
          <input
            type="text"
            id="newTodo"
            className="bg-transparent w-full focus:outline-none px-3 pt-1 lg:px-6 text-xs sm:text-base lg:text-lg placeholder:text-gray-400"
            placeholder="Create a new todo..."
            {...register("newTodo", {
              required: "Please include a search value",
              maxLength: {
                value: 25,
                message: "Too much",
              },
              minLength: {
                value: 2,
                message: "Too little",
              },
            })}
          />
          {errors.newTodo && (
            <p className="error-msg absolute top-0 text-red-500 italic text-sm">
              {errors.newTodo.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default InputForm;
