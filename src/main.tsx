import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // importera Redux store
import { router } from "./router.tsx";
import "./Styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}> {/* Lägg till Provider här */}
    <RouterProvider router={router} />
  </Provider>
);
