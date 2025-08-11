/// <reference types="@rsbuild/core/types" />

export type BaseResponseType = {
  msg: string;
  code: number;
  [key: string]: any;
};
