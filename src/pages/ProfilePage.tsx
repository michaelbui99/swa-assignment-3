import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import UserStats from "../components/UserStats";
import { EditIcon } from "@chakra-ui/icons";
import { updateUser } from "../app/features/userSlice";

const ProfilePage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.value);

    const [displayName, setDisplayName] = useState(
        currentUser?.displayName ?? ""
    );

    const [profileImage, setProfileImage] = useState(
        currentUser?.profileImageUrl ?? ""
    );

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    return (
        <>
            {currentUser && (
                <Flex flexDir="row" justifyContent="center" width="100%">
                    <Box width="20%">
                        <Flex
                            flexDir="column"
                            justifyContent="center"
                            alignItems="center"
                            marginTop="4rem"
                            height="100%"
                            width="100%"
                        >
                            <EditIcon
                                marginLeft="auto"
                                transition="all 0.3s ease-in-out"
                                onClick={onOpen}
                                _hover={{ cursor: "pointer", color: "#D8DEE9" }}
                            />
                            <UserCard user={currentUser} />
                            <UserStats games={currentUser.games} />

                            <Modal
                                closeOnOverlayClick={false}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit Profile</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl>
                                            <FormLabel>Username</FormLabel>
                                            <Input
                                                disabled={true}
                                                value={currentUser.username}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Display Name</FormLabel>
                                            <Input
                                                value={displayName}
                                                onChange={(e) =>
                                                    setDisplayName(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>
                                                Profile Image URL
                                            </FormLabel>
                                            <Input
                                                value={profileImage}
                                                onChange={(e) =>
                                                    setProfileImage(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => {
                                                dispatch(
                                                    updateUser({
                                                        ...currentUser,
                                                        displayName,
                                                        profileImageUrl:
                                                            profileImage,
                                                    })
                                                );

                                                onClose();
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={onClose}
                                            marginLeft="1rem"
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                    </Box>
                </Flex>
            )}
        </>
    );
};

export default ProfilePage;
