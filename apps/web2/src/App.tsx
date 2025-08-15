import { AxiosProvider, HttpContextProvider } from "utils";
import NiceModal from "@ebay/nice-modal-react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ThemeProvider } from "theme";
import { ConfigProvider } from "antd";

const router = createHashRouter(routes);

const App = () => {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <AxiosProvider baseUrl="http://localhost:8000/">
          <HttpContextProvider>
            <NiceModal.Provider>
              <RouterProvider router={router} />
            </NiceModal.Provider>
          </HttpContextProvider>
        </AxiosProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
