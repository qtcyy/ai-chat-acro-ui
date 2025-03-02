import { request } from "utils";
import { BaseResponseType } from "../../../env";

export type RegisterInfoType = {
  username: string;
  phone: string;
  email: string;
  password: string;
};

type RegisterResponseType = {
  token: string;
} & BaseResponseType;

export async function register(params: RegisterInfoType) {
  try {
    const response = await request.post<RegisterResponseType>(
      "/api/user/register",
      params
    );
    if (response.data.code === 200) {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkUsername(username: string): Promise<boolean> {
  try {
    const response = await request.get<BaseResponseType>(
      "/api/user/register/checkUsername",
      {
        params: { username },
      }
    );
    console.log(response.data);
    return response.data.code === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkPhone(phone: string): Promise<boolean> {
  try {
    const response = await request.get<BaseResponseType>(
      "/api/user/register/checkPhone",
      {
        params: { phone },
      }
    );
    return response.data.code === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkEmail(email: string): Promise<boolean> {
  try {
    const response = await request.get<BaseResponseType>(
      "/api/user/register/checkEmail",
      {
        params: { email },
      }
    );
    return response.data.code === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
