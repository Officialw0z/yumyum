import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing"
 /* import Receipt from "./pages/Receipt" */
import Status from './components/etascreen'
 
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Landing />} />
            <Route path="/status" element={<Status />} />/
            {/* { <Route path="/about" element={<Receipt />} /> */}
        </Route>
    )
)