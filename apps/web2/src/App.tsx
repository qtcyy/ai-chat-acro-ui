import { AxiosProvider, HttpContextProvider } from "utils";
import NiceModal from "@ebay/nice-modal-react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ThemeProvider } from "theme";
import { ConfigProvider } from "antd";
import { HistoryProvider } from "./page/chat/hooks/useHistory";
import { TokenInterceptor } from "./interceptors/TokenInterceptor";
import { apiConfig } from "./config/api";
import "simplebar-react/dist/simplebar.min.css";

const router = createHashRouter(routes);

const App = () => {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <AxiosProvider baseUrl={`${apiConfig.chatbotBaseUrl}/`}>
          <HttpContextProvider fnInterceptors={[TokenInterceptor]}>
            <HistoryProvider>
              <NiceModal.Provider>
                <RouterProvider router={router} />
              </NiceModal.Provider>
            </HistoryProvider>
          </HttpContextProvider>
        </AxiosProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
