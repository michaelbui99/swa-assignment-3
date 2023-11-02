import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../app/features/userSlice";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    useEffect(() => {
        if (currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    const usernameIsInvalid = usernameInput == "";
    const passwordIsInvalid = passwordInput.length < 8;

    const handleUsernameChange = (e: any) => setUsernameInput(e.target.value);
    const handlePasswordChange = (e: any) => setPasswordInput(e.target.value);

    const dispatch = useDispatch<AppDispatch>();

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
                    value={passwordInput}
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
                        createUser({
                            admin: false,
                            id: -1,
                            password: passwordInput,
                            username: usernameInput,
                        })
                    );
                }}
            >
                Signup
            </Button>
        </Flex>
    );
};

export default SignUpPage;
