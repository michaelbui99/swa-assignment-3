import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import GamePage from "./pages/GamePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <App></App>
            </Layout>
        ),
    },
    {
        path: "/game",
        element: (
            <Layout>
                <GamePage />
            </Layout>
        ),
    },
    {
        path: "/signup",
        element: (
            <Layout>
                <SignUpPage />
            </Layout>
        ),
    },
    {
        path: "/login",
        element: (
            <Layout>
                <LoginPage />
            </Layout>
        ),
    },
    {
        path: "/profile",
        element: (
            <Layout>
                <ProfilePage />
            </Layout>
        ),
    },
]);
