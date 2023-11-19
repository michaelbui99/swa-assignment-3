import React from "react";
import { Game } from "../app/models/game";
import { Flex, Text } from "@chakra-ui/react";

export interface GamesListProps {
    games: Game[];
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
    return (
        <Flex
            justifyContent="flex-start"
            flexDir="column"
            alignItems="center"
            rowGap="2rem"
            width="100%"
            textAlign="center"
            height="100%"
            marginTop="2rem"
        >
            {games.map((game) => (
                <Flex flexDir="column">
                    <Text>Game: {game.id}</Text>
                    <Text>Score: {game.score}</Text>
                    <Text>Completed: {game.completed ? "Yes" : "No"}</Text>
                </Flex>
            ))}
        </Flex>
    );
};

export default GamesList;
