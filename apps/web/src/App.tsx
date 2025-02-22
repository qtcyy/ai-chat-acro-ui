import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";
import { routes } from "./routes";
import NiceModal from "@ebay/nice-modal-react";

const router = createHashRouter(routes);

const App = () => {
  return (
    <NiceModal.Provider>
      <RouterProvider router={router} />
    </NiceModal.Provider>
  );
};

export default App;
