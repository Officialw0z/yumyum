import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing";
import ReceiptPage from "./pages/Receipt";
import StatusPage from './pages/Status';
 
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Landing />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/receipt/:orderId" element={<ReceiptPage />} />
        </Route>
    )
);
