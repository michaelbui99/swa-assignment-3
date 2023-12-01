import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import RouteLink from "./RouteLink";
import { useNavigate } from "react-router-dom";

export type RouteLinkType = {
    label: string;
    route: string;
    show: boolean;
};

export type NavbarProps = {
    routeLinks: RouteLinkType[];
};

const Navbar: React.FC<NavbarProps> = ({ routeLinks }) => {
    const navigate = useNavigate();

    return (
        <Flex
            justifyContent="space-between"
            flexDir="row"
            height="4rem"
            backgroundColor="#4C566A"
            alignItems="center"
            padding="0rem 4rem"
        >
            <Heading
                color="#D8DEE9"
                transition="all 0.3s ease-in-out"
                _hover={{
                    opacity: 0.8,
                    color: "#222",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                SWA Crush
            </Heading>
            <Flex columnGap="1rem">
                {routeLinks
                    .filter((link) => link.show)
                    .map((link) => (
                        <RouteLink key={link.label} link={link} />
                    ))}
            </Flex>
        </Flex>
    );
};

export default Navbar;
