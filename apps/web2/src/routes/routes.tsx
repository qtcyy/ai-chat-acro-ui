import { RouteObject } from "react-router-dom";
import { TestHome } from "../page/home/TestHome";
import { HomePage } from "../page/home/HomePage";
import ChatLayout from "../page/chat/layout/ChatLayout";
import { ChatHome } from "../page/chat/layout/ChatHome";
import { Chat } from "../page/chat/layout/Chat";
import { ChatHistory } from "../page/chat/layout/ChatHistory";
import { NotFound } from "../page/error/NotFound";
import LoginPage from "../page/login/LoginPage";
import RegisterPage from "../page/login/RegisterPage";

export const routes: RouteObject[] = [
  {
    path: "/test",
    // test page
    element: <TestHome />,
  },
  {
    path: "/",
    element: <HomePage />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "/chat/",
    element: <ChatLayout />,
    children: [
      {
        path: "home",
        element: <ChatHome />,
      },
      {
        path: "history",
        element: <ChatHistory />,
      },
      {
        path: ":chatId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
