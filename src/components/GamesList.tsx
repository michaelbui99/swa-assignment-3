import React from "react";
import { Game } from "../app/models/game";
import { Flex } from "@chakra-ui/react";

export interface GamesListProps {
    games: Game[];
}

const GamesList = () => {
    return <Flex justifyContent="flex-start" flexDir="column"></Flex>;
};

export default GamesList;
