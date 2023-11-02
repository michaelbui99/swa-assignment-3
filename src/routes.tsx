import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import GamePage from "./pages/GamePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
    },
    {
        path: "/game",
        element: <GamePage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);
