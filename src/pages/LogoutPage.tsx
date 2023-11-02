import React, { useState } from "react";
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
import { logoutUser } from "../app/features/userSlice";
import { AppDispatch, RootState } from "../app/store";

const Logoutpage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.user.value);

    return (
        <Button
            onClick={() => {
                dispatch(logoutUser(currentUser));
            }}
        >
            Login
        </Button>
    );
};

export default Logoutpage;
