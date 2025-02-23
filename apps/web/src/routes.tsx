import { RouteObject } from "react-router-dom";
import { HomePage } from "./page/home/HomePage";
import { CardPage } from "./page/ui/card/CardPage";
import { MenuPage } from "./page/ui/Menu/MenuPage";
import { Layout } from "./page/ui/layout/layout";
import { DashBoard } from "./page/home/DashBoard";
import { ChatLayout } from "./page/chat";
import { Chat } from "./page/chat/layout/Chat";
import { ChatHome } from "./page/chat/layout/ChatHome";
import { HistoryList } from "./page/chat/history/HistoryList";
import { TimerPage } from "./page/ui/test/TimerPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/ui/card",
        element: <CardPage />,
      },
      {
        path: "/ui/menu",
        element: <MenuPage />,
      },
      {
        path: "/test/timer",
        element: <TimerPage />,
      },
    ],
  },
  {
    path: "/ai",
    element: <ChatLayout />,
    children: [
      {
        path: "/ai/chat",
        element: <ChatHome />,
      },
      {
        path: "/ai/chat/list",
        element: <HistoryList />,
      },
      {
        path: "/ai/chat/page/:chatId",
        element: <Chat />,
      },
    ],
  },

  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        path: "/layout/main",
        element: <DashBoard />,
      },
      {
        path: "/layout/manage",
      },
    ],
  },
];
