import { RouteObject } from "react-router-dom";
import { TestHome } from "../page/home/TestHome";
import { HomePage } from "../page/home/HomePage";
import ChatLayout from "../page/chat/layout/ChatLayout";
import { ChatHome } from "../page/chat/layout/ChatHome";
import { Chat } from "../page/chat/layout/Chat";

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
    path: "/chat/",
    element: <ChatLayout />,
    children: [
      {
        path: "home",
        element: <ChatHome />,
      },
      {
        path: "history",
      },
      {
        path: ":chatId",
        element: <Chat />,
      },
    ],
  },
];
