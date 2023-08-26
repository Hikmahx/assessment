import React from "react";

const InputForm = () => {
  return (
    <div className="form-wrapper mx-6">
      <div
        style={{ maxWidth: "34rem", top: "0.1rem" }}
        className="relative mx-auto h-12 lg:h-16 bg-white transition-colors rounded flex items-center"
      >
        <form
          // onSubmit={submitTodo}
          className="w-full mx-5 lg:mx-6 flex items-center"
        >
          <span className="relative cursor-pointer font-bold text-primary text-3xl">
              +
          </span>
          <input
            // onChange={inputTodo}
            // value={input}
            type="text"
            className="bg-transparent w-full focus:outline-none px-3 pt-1 lg:px-6 text-xs sm:text-base lg:text-lg"
            placeholder="Create a new todo..."
          />
        </form>
      </div>
    </div>
  );
};

export default InputForm;
