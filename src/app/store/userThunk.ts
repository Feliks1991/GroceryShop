import z from "zod";
import { createAppAsyncThunk } from "./reduxTypes";
import { BaseUserSchema, LoginResponseSchema, LoginShema, MessageSchema } from "./zodTypesUser";

type LoginRequest = z.infer<typeof LoginShema>;
type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const login = createAppAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (data, { extra }) => {
    const { authApi } = extra;
    const response = await authApi.login(data, LoginResponseSchema);
    return response;
  },
);

type LogoutResponse = z.infer<typeof MessageSchema>;

export const logout = createAppAsyncThunk<LogoutResponse>("auth/logout", async (__, { extra }) => {
  const { authApi } = extra;
  const response = await authApi.logout(MessageSchema);
  return response;
});

export const user = createAppAsyncThunk<LoginResponse>("auth/user", async (__, { extra }) => {
  const { userApi } = extra;
  const response = await userApi.user(LoginResponseSchema);
  return response;
});

type RegisterRequest = z.infer<typeof BaseUserSchema>;
type RegisterResponse = z.infer<typeof MessageSchema>;

export const registerUser = createAppAsyncThunk<RegisterResponse, RegisterRequest>(
  "auth/register",
  async (data, { extra }) => {
    const { userApi } = extra;
    const res = await userApi.register(data, MessageSchema);
    return res;
  },
);

type EditRequest = z.infer<typeof BaseUserSchema>;
type EditResponse = z.infer<typeof LoginResponseSchema>;

export const editUser = createAppAsyncThunk<EditResponse, EditRequest>(
  "auth/edit",
  async (data, { extra }) => {
    const { userApi } = extra;
    const res = await userApi.edit(data, LoginResponseSchema);
    return res;
  },
);

type DeleteResponse = z.infer<typeof MessageSchema>;

export const deleteUser = createAppAsyncThunk<DeleteResponse>(
  "auth/delete",
  async (__, { extra }) => {
    const { userApi } = extra;
    const res = await userApi.delete(MessageSchema);
    return res;
  },
);
