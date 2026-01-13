import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodType } from "zod";
import { zodParser } from "./Schema";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

type PosibilytyResponse = {
  accessToken?: string;
  [key: string]: unknown;
};

type BaseQuery = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export const instance: AxiosInstance = axios.create({
  baseURL: "https://grocerybackend-production-6d47.up.railway.app",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosBaseQuery =
  (): BaseQueryFn<BaseQuery> =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await instance.request({ url, method, data, params, headers });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response.config.url?.startsWith("/auth/")) {
      return response.data;
    }
    const { accessToken, ...data } = response.data as PosibilytyResponse;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      return data;
    }
    return response.data;
  },
  async (error: AxiosError) => {
    const url = error.config?.url ?? "";
    if (!url.startsWith("/auth/")) {
      throw error.response?.data;
    }
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status === 401 && originalRequest) {
      try {
        await instance.post("/auth/refresh");
        return await instance(originalRequest);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw err.response?.data;
        }
        throw err;
      }
    }
    throw error.response?.data;
  },
);

const authApi = {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  login: async <D, Z>(data: D, schema: ZodType<Z>): Promise<Z> => {
    const result = await instance.post("/auth/login", data);
    return zodParser(result, schema);
  },
  logout: async <Z>(schema: ZodType<Z>): Promise<Z> => {
    const result = await instance.post("/auth/logout");
    return zodParser(result, schema);
  },
};

const userApi = {
  user: async <Z>(schema: ZodType<Z>): Promise<Z> => {
    const result = await instance.get("/auth/user");
    return zodParser(result, schema);
  },
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  register: async <D, Z>(data: D, schema: ZodType<Z>): Promise<Z> => {
    const result = await instance.post("/auth/register", data);
    return zodParser(result, schema);
  },
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  edit: async <D, Z>(data: D, schema: ZodType<Z>): Promise<Z> => {
    const result = await instance.patch("/auth/edit", data);
    return zodParser(result, schema);
  },
  delete: async <Z>(schema: ZodType<Z>): Promise<Z> => {
    const result = await instance.delete("/auth/delete");
    return zodParser(result, schema);
  },
};

export const api = {
  userApi,
  authApi,
};
