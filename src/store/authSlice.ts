import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  registerUser,
  updateProfile,
  type ChangePasswordPayload,
  type LoginPayload,
  type RegisterPayload,
  type UpdateProfilePayload,
} from "@/api/auth";

interface User {
  id: number;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  accessToken: savedToken,
  loading: false,
  error: null,
  successMessage: null,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: RegisterPayload, thunkAPI) => {
    try {
      const response = await registerUser(data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Registration failed",
      );
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, thunkAPI) => {
    try {
      const response = await loginUser(data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Login failed",
      );
    }
  },
);

export const getMeThunk = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await getCurrentUser();

    localStorage.setItem("user", JSON.stringify(response.user));

    return response.user;
  } catch (error: any) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Unauthorized",
    );
  }
});

export const updateProfileThunk = createAsyncThunk<
  User,
  UpdateProfilePayload,
  { rejectValue: string }
>("auth/updateProfile", async (data, thunkAPI) => {
  try {
    const user = await updateProfile(data);

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Profile update failed",
    );
  }
});

export const changePasswordThunk = createAsyncThunk<
  { message: string },
  ChangePasswordPayload,
  { rejectValue: string }
>("auth/changePassword", async (data, thunkAPI) => {
  try {
    const response = await changePassword(data);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Password change failed",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.successMessage = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    clearAuthMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET CURRENT USER
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(getMeThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })

      // UPTADE PROFILE
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed";
      })

      //CHANGE PASSWORD
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password change failed";
      });
  },
});

export const { clearAuthError, clearAuthMessages, logout } = authSlice.actions;

export default authSlice.reducer;
