import React from "react";
import { User } from "../app/models/user";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import UserStats from "./UserStats";

export interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const defaultProfileImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";

    return (
        <Flex
            width="20%"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                maxHeight="150px"
                maxWidth="150px"
                src={user.profileImageUrl ?? defaultProfileImage}
            />
            <Text textAlign="center" fontWeight="bold" fontSize="xl">
                {" "}
                {user.displayName ?? user.username}
            </Text>
            <Text
                fontSize="md"
                color="#D8DEE9"
                textAlign="center"
                fontStyle="italic"
                transition="all 0.3s ease-in-out"
                _hover={{ color: "#222", cursor: "default" }}
            >
                {" "}
                #{user.username}
            </Text>
        </Flex>
    );
};

export default UserCard;
