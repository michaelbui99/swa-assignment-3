import { VStack, Text, Heading } from "@chakra-ui/react";
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
        <VStack>
            <Heading fontSize="xl" fontWeight="bold">
                {statistic.title}
            </Heading>
            <Text>{statistic.value}</Text>
        </VStack>
    );
};

export default UserStatistic;
