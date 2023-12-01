import React, { useEffect, useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/features/userSlice";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState("test123");
    const [userPasswordInput, setPasswordInput] = useState("test123");

    const usernameIsInvalid = usernameInput == "";
    const passwordIsInvalid = userPasswordInput.length < 8;

    const handleUsernameChange = (e: any) => setUsernameInput(e.target.value);
    const handlePasswordChange = (e: any) => setPasswordInput(e.target.value);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    return (
        <Flex flexDirection="column">
            <FormControl isInvalid={usernameIsInvalid}>
                <FormLabel>Username</FormLabel>
                <Input
                    type="text"
                    value={usernameInput}
                    onChange={handleUsernameChange}
                />
                {!usernameIsInvalid ? (
                    <FormHelperText></FormHelperText>
                ) : (
                    <FormErrorMessage>Username is required</FormErrorMessage>
                )}
            </FormControl>

            <FormControl isInvalid={passwordIsInvalid}>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={userPasswordInput}
                    onChange={handlePasswordChange}
                />
                {!passwordIsInvalid ? (
                    <FormHelperText></FormHelperText>
                ) : (
                    <FormErrorMessage>Password is required</FormErrorMessage>
                )}
            </FormControl>
            <Button
                onClick={() => {
                    dispatch(
                        loginUser({
                            username: usernameInput,
                            password: userPasswordInput,
                        })
                    );
                }}
            >
                Login
            </Button>
        </Flex>
    );
};

export default LoginPage;
