import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";
import { routes } from "./routes";
import NiceModal from "@ebay/nice-modal-react";
import { ConfigProvider } from "@arco-design/web-react";
import { AxiosProvider } from "utils";
import { ThemeProvider } from "theme";

const router = createHashRouter(routes);

const App = () => {
  return (
    <ThemeProvider>
      <NiceModal.Provider>
        <ConfigProvider>
          <AxiosProvider baseUrl="http://localhost:8081">
            <RouterProvider router={router} />
          </AxiosProvider>
        </ConfigProvider>
      </NiceModal.Provider>
    </ThemeProvider>
  );
};

export default App;
