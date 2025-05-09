import { RouteObject } from "react-router-dom";
import { HomePage } from "./page/home/HomePage";
import { CardPage } from "./page/ui/card/CardPage";
import { MenuPage } from "./page/ui/Menu/MenuPage";
import { Layout } from "./page/ui/layout/layout";
import { DashBoard } from "./page/home/DashBoard";
import { TimerPage } from "./page/ui/test/TimerPage";
import { RegisterPage } from "./page/register";
import { lazy } from "react";
import NotFoundPage from "./page/BasePage/404Page";
import AppearancePage from "./page/chat/setting/SubPage/AppearancePage";
const LazyChatHome = lazy(() => import("./page/chat/layout/ChatHome"));
const LazyChatLayout = lazy(() => import("./page/chat/layout/layout"));
const LazyHistoryList = lazy(() => import("./page/chat/history/HistoryList"));
const LazyChat = lazy(() => import("./page/chat/layout/Chat"));
const LazyCreateProject = lazy(
  () => import("./page/chat/Projects/CreateProjectPage")
);
const LazyProjectList = lazy(
  () => import("./page/chat/Projects/ProjectListPage")
);
const LazyProjectPage = lazy(() => import("./page/chat/Projects/ProjectPage"));
const LazySettingPage = lazy(() => import("./page/chat/setting/SettingPage"));
const LazyMoreAppsPage = lazy(
  () => import("./page/chat/MoreApps/MoreAppsPage")
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LazyChatLayout />,
    children: [
      {
        path: "ai/chat",
        element: <LazyChatHome />,
      },
      {
        path: "ai/chat/list",
        element: <LazyHistoryList />,
      },
      {
        path: "ai/chat/page/:chatId",
        element: <LazyChat />,
      },
      {
        path: "ai/chat/projects",
        element: <LazyProjectList />,
      },
      {
        path: "ai/chat/projects/create",
        element: <LazyCreateProject />,
      },
      {
        path: "ai/chat/projects/:id",
        element: <LazyProjectPage />,
      },
      {
        path: "ai/setting/",
        element: <LazySettingPage />,
        children: [
          {
            path: "appearance",
            element: <AppearancePage />,
          },
          {
            path: "account",
          },
          {
            path: "info",
          },
        ],
      },
      {
        path: "ai/more/",
        element: <LazyMoreAppsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/ai/register",
    element: <RegisterPage />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <HomePage />,
    children: [
      {
        path: "ui/card",
        element: <CardPage />,
      },
      {
        path: "ui/menu",
        element: <MenuPage />,
      },
      {
        path: "test/timer",
        element: <TimerPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        path: "layout/main",
        element: <DashBoard />,
      },
      {
        path: "layout/manage",
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
