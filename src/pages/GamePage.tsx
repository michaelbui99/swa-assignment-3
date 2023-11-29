import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router";
import { createNewGameThunk } from "../app/features/gameSlice";

export interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
    const currentUser = useSelector((state: RootState) => state.user.value);
    const game = useSelector((state: RootState) => state.game.game);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }

        if (!game) {
            dispatch(createNewGameThunk(currentUser!));
        }
    }, [currentUser, game]);

    return <div>GamePage</div>;
};

export default GamePage;
