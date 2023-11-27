import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import Navbar, { RouteLinkType } from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const currentUser = useSelector((state: RootState) => state.user.value);

    const routeLinks = [
        {
            label: "Login",
            route: "/login",
            show: currentUser ? false : true,
        },
        {
            label: "Sign Up",
            route: "/signup",
            show: currentUser ? false : true,
        },
        {
            label: "Profile",
            route: "/profile",
            show: currentUser ? true : false,
        },
        {
            label: "Score",
            route: "/scores",
            show: currentUser ? true : false,
        },
        {
            label: "New Game",
            route: "/game",
            show: currentUser ? true : false,
        },
    ] as RouteLinkType[];

    return (
        <Stack>
            <Navbar routeLinks={routeLinks} />
            <Box padding="0rem 4rem">{children}</Box>
        </Stack>
    );
};

export default Layout;
