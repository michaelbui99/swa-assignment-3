import React from "react";
import { User } from "../app/models/user";
import { Flex, Image, Text } from "@chakra-ui/react";
import UserStats from "./UserStats";

export interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const defaultProfileImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";

    return (
        <Flex
            width="100%"
            height="2rem"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                maxHeight="100px"
                maxWidth="100px"
                src={user.profileImageUrl ?? defaultProfileImage}
            />
            <Text fontWeight="bold" fontSize="xl">
                {" "}
                {user.displayName ?? user.username}
            </Text>
            <Text
                fontSize="md"
                color="#D8DEE9"
                fontStyle="italic"
                transition="all 0.3s ease-in-out"
                _hover={{ color: "#222", cursor: "default" }}
            >
                {" "}
                #{user.username}
            </Text>

            <UserStats games={user.games} />
        </Flex>
    );
};

export default UserCard;
