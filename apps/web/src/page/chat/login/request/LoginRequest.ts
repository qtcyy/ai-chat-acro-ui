import { request } from "utils";
import { BaseResponseType } from "../../../../env";

export type LoginRequestType = {
  mergedName: string;
  password: string;
};

type LoginResponseType = { token: string } & BaseResponseType;

export async function login(params: LoginRequestType) {
  try {
    const response = await request.post<LoginResponseType>(
      "/api/user/login",
      params
    );
    console.log(response.data);
    if (response.data.code === 200) {
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("No token info");
      }
    }
  } catch (error) {
    throw error;
  }
}
