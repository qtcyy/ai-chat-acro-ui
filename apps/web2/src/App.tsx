import { AxiosProvider } from "utils";
import NiceModal from "@ebay/nice-modal-react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ThemeProvider } from "theme";

const router = createHashRouter(routes);

const App = () => {
  return (
    <ThemeProvider>
      <AxiosProvider baseUrl="http://0.0.0.0:8000/">
        <NiceModal.Provider>
          <RouterProvider router={router} />
        </NiceModal.Provider>
      </AxiosProvider>
    </ThemeProvider>
  );
};

export default App;
