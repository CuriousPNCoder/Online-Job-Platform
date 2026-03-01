import axios from "axios";
import { storageKeys } from "@/lib/constants";

const normalizeEntity = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeEntity(item)) as T;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const normalized: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(record)) {
      normalized[key] = normalizeEntity(nestedValue);
    }

    if (!normalized.id && typeof normalized._id === "string") {
      normalized.id = normalized._id;
    }

    return normalized as T;
  }

  return value;
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(storageKeys.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    response.data = normalizeEntity(response.data);
    return response;
  },
  (error) => {
    const message = error.response?.data?.message ?? "Something went wrong";
    return Promise.reject({
      ...error,
      userMessage: message,
      errorCode: error.response?.data?.errorCode
    });
  }
);
