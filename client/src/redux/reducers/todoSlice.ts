import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
interface KnownError {
  errMessage: string;
}

const API_LINK = `/api/todos`;

interface NewTodo {
  todo: string;
  completed: boolean;
}
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const config = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": userToken,
  },
};

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ todo, completed }: NewTodo, { rejectWithValue }) => {
    try {
      await axios.post(API_LINK, { todo, completed }, config);
      let { data } = await axios.get(API_LINK, config);
      const todos = await data;
      return todos;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(API_LINK, config);
      const todos = await data;
      return todos;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, dataInfo }: any, { rejectWithValue }) => {
    try {
      await axios.put(`${API_LINK}/${id}`, dataInfo, config);

      let { data } = await axios.get(API_LINK, config);
      const todos = await data;
      return todos;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_LINK}/${id}`, config);

      let { data } = await axios.get(API_LINK, config);
      const todos = await data;
      return todos;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  todos: [],
  todo: [],
  error: false,
  errMessage: "",
  total: 0,
  loading: false,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.errMessage = "";
    });
    builder.addCase(addTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errMessage = (payload as any).message;
    });
    builder.addCase(getTodos.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.errMessage = "";
    });
    builder.addCase(getTodos.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errMessage = (payload as any).message;
    });
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos = payload;
      state.errMessage = "";
    });
    builder.addCase(updateTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errMessage = (payload as any).message;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos = payload;
      state.errMessage = "";
    });
    builder.addCase(deleteTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errMessage = (payload as any).message;
    });
  },
});

export const { clearTodos } = TodoSlice.actions;

export default TodoSlice.reducer;
