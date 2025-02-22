import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";
import { routes } from "./routes";
import NiceModal from "@ebay/nice-modal-react";
import { ConfigProvider } from "@arco-design/web-react";

const router = createHashRouter(routes);

const App = () => {
  return (
    <NiceModal.Provider>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </NiceModal.Provider>
  );
};

export default App;
