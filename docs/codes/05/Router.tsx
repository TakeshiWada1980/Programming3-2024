import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App01 from "./App1";
import App02 from "./App2";

const repositoryName = "react-todo-app";
const baseUrl =
  process.env.NODE_ENV === "production" ? `/${repositoryName}/` : "/";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App01 />} />
    <Route path="/2" element={<App02 />} />
    <Route path="*" element={<App01 />} />
  </>
);

export const Router = createBrowserRouter(routes, {
  basename: baseUrl,
});
