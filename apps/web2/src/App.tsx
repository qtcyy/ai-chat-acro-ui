import { AxiosProvider } from "utils";
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
        <AxiosProvider baseUrl="http://0.0.0.0:8000/">
          <NiceModal.Provider>
            <RouterProvider router={router} />
          </NiceModal.Provider>
        </AxiosProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
