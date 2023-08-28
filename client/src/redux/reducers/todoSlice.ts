import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from '../store';

interface KnownError {
  errMessage: string;
}

const API_LINK = `https://straitpay-todo-assessment.onrender.com/api/todos`;

interface NewTodo {
  todo: string;
  completed: boolean;
}

interface TodoItem {
  _id: string; 
  todo: string;
  completed: boolean;
}

interface TodoState {
  loading: boolean;
  error: boolean;
  errMessage: string;
  todos: TodoItem[]; 
}

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ todo, completed }: NewTodo, { getState, rejectWithValue }) => {
    try {
      const { userToken } = (getState() as RootState).auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': userToken,
        },
      };

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
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userToken } = (getState() as RootState).auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': userToken,
        },
      };

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
  async ({ id, dataInfo }: any, { getState, rejectWithValue }) => {
    try {
      const { userToken } = (getState() as RootState).auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': userToken,
        },
      };

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
  async (id: string | undefined, { getState, rejectWithValue }) => {
    try {
      const { userToken } = (getState() as RootState).auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': userToken,
        },
      };

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

const initialState: TodoState = {
  todos: [],
  error: false,
  errMessage: "",
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
      state.errMessage = (payload as any).message  || "Error has occured";
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
      state.errMessage = (payload as any).message  || "Error has occured";
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
      state.errMessage = (payload as any).message  || "Error has occured";
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
      state.errMessage = (payload as any).message  || "Error has occured";
    });
  },
});

export const { clearTodos } = TodoSlice.actions;

export default TodoSlice.reducer;
