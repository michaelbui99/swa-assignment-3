import React from "react";
import { RouteLinkType } from "./Navbar";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface RouteLinkProps {
    link: RouteLinkType;
}

const RouteLink: React.FC<RouteLinkProps> = ({ link }) => {
    const navigate = useNavigate();

    return (
        <Button colorScheme="cyan" onClick={() => navigate(link.route)}>
            {link.label}
        </Button>
    );
};

export default RouteLink;
