import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import UserCard from "../components/UserCard";

const ProfilePage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    return (
        <>
            {currentUser && (
                <VStack marginTop="4rem">
                    <UserCard user={currentUser} />
                </VStack>
            )}
        </>
    );
};

export default ProfilePage;
