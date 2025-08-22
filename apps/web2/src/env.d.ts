/// <reference types="@rsbuild/core/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_CHAT_MANAGE_BACKEND?: string;
    readonly REACT_APP_CHATBOT_BACKEND?: string;
  }
}