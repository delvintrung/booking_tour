import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BaseAPIURL =
  import.meta.env.BASE_API_URL || "http://localhost:8080/api/v1";

export const AxiosClient = axios.create({
  baseURL: BaseAPIURL,
  withCredentials: true,
});

AxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const changeToVND = (amount: number) => {
  const res = amount.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return res;
};
