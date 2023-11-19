import React from "react";
import { Game } from "../app/models/game";
import UserStatistic from "./UserStatistic";
import { Flex } from "@chakra-ui/react";

export interface UserStatsProps {
    games: Game[];
}

const UserStats: React.FC<UserStatsProps> = ({ games }) => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            columnGap="2rem"
        >
            <UserStatistic
                statistic={{ title: "Games played", value: games.length }}
            />

            <UserStatistic
                statistic={{
                    title: "Games completed",
                    value: games.filter((game) => game.completed).length,
                }}
            />

            <UserStatistic
                statistic={{
                    title: "Highest score",
                    value:
                        games
                            .map((game) => game.score)
                            .sort((a, b) => b - a)[0] ?? 0,
                }}
            />
        </Flex>
    );
};

export default UserStats;
