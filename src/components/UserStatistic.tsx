import { VStack, Text, Heading, Flex } from "@chakra-ui/react";
import React from "react";

export type UserStatisticType = {
    title: string;
    value: string | number;
};

export interface UserStatisticProps {
    statistic: UserStatisticType;
}

const UserStatistic: React.FC<UserStatisticProps> = ({ statistic }) => {
    return (
        <Flex flexDir="column" alignItems="center">
            <Heading textAlign="center" fontSize="xl" fontWeight="bold">
                {statistic.title}
            </Heading>
            <Text textAlign="center">{statistic.value}</Text>
        </Flex>
    );
};

export default UserStatistic;
