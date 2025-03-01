import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";
import { routes } from "./routes";
import NiceModal from "@ebay/nice-modal-react";
import { ConfigProvider } from "@arco-design/web-react";
import { AxiosProvider } from "utils";

const router = createHashRouter(routes);

const App = () => {
  return (
    <NiceModal.Provider>
      <ConfigProvider>
        <AxiosProvider baseUrl="http://localhost:8081">
          <RouterProvider router={router} />
        </AxiosProvider>
      </ConfigProvider>
    </NiceModal.Provider>
  );
};

export default App;
