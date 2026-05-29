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
import { getApiErrorMessage } from "@/helpers/apiError";
import {
  getStoredJson,
  removeStoredItem,
  setStoredJson,
} from "@/helpers/storage";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const savedToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
  user: getStoredJson<User | null>("user", null),
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
      setStoredJson("user", response.user);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getApiErrorMessage(error, "Registration failed"),
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
      setStoredJson("user", response.user);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getApiErrorMessage(error, "Login failed"),
      );
    }
  },
);

export const getMeThunk = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const user = await getCurrentUser();

    setStoredJson("user", user);

    return user;
  } catch (error) {
    removeStoredItem("accessToken");
    removeStoredItem("user");

    return thunkAPI.rejectWithValue(
      getApiErrorMessage(error, "Unauthorized"),
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

    setStoredJson("user", user);

    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      getApiErrorMessage(error, "Profile update failed"),
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
  } catch (error) {
    return thunkAPI.rejectWithValue(
      getApiErrorMessage(error, "Password change failed"),
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

      removeStoredItem("accessToken");
      removeStoredItem("user");
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
      // Register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get current user
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })

      // Update profile
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Profile updated successfully";
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed";
      })

      // Change password
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password change failed";
      });
  },
});

export const { clearAuthError, clearAuthMessages, logout } = authSlice.actions;

export default authSlice.reducer;
