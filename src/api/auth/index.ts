import api from "@/api";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  fullName: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

//Register User
export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
//Login User
export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await api.put("/auth/me/profile", data);
  return response.data;
};

export const changePassword = async (data: ChangePasswordPayload) => {
  const response = await api.put("/auth/me/password", data);
  return response.data;
};