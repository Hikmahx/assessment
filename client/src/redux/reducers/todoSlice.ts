import { createSlice } from "@reduxjs/toolkit";
// import axios, { AxiosError } from "axios";


const initialState = {
  todos: [],
  filterTodos: [],
  todo: [],
  error: false,
  errMessage: "",
  total: 0,
  loading: false,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {}
})

// export const {  } = TodoSlice.actions;

export default TodoSlice.reducer;