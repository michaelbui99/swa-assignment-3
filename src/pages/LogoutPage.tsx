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
import { logoutUser } from "../app/features/userSlice";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const Logoutpage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
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
                <Button
                    onClick={() => {
                        dispatch(logoutUser(currentUser!!));
                    }}
                >
                    Login
                </Button>
            )}
        </>
    );
};

export default Logoutpage;
