import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from '../store';

interface RegisterUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface UserInfo {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface AuthState {
  error: boolean;
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  success: boolean;
  errMsg: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: RegisterUser, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post("/api/users", data, config);
    } catch (err: any) {
      console.log("Error response:", err.response.data);

      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginUser, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let { data } = await axios.post(
        "/api/auth",
        { email, password },
        config
      );
      let user = data;

      localStorage.setItem("userToken", user.token);
      return data;
    } catch (err: any) {
      console.log("Error response:", err.response.data);

      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, { getState, rejectWithValue }) => {
    try {

      const { userToken } = (getState() as RootState).auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          // "x-auth-token": userToken,
          'x-auth-token': userToken,
        },
      };

      let { data } = await axios.get("/api/auth", config);

      return data;
    } catch (err: any) {
      console.log("Error response:", err.response.data);

      return rejectWithValue(err.response.data);
    }
  }
);

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState: AuthState = {
  error: false,
  loading: false,
  userInfo: null,
  userToken: localStorage.getItem("userToken") || null,
  success: false,
  errMsg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = false;
      state.errMsg = ''
    },
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errMsg = (payload as any).message || "Error has ocurred";
      })
      .addCase(loginUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
        state.errMsg = "";
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errMsg = (payload as any).message || "Error has ocurred";
      })
      .addCase(getUserDetails.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errMsg = (payload as any) || "Error has occured";
      });
  },
});
export const { removeError, logout } = authSlice.actions;
export default authSlice.reducer;
