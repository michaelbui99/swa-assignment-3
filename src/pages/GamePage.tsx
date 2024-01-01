import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router";
import {
    createNewGameThunk,
    endGameThunk,
    makeMoveThunk,
} from "../app/features/gameSlice";
import "../App.css";
import { RandomGenerator } from "../game/random-generator";
import { canMove } from "../game/board";

export interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
    const MAX_MOVES = 3;
    const currentUser = useSelector((state: RootState) => state.user.value);
    const game = useSelector((state: RootState) => state.game.value);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [targetPiece, setTargetPiece] = useState<{
        row: number;
        col: number;
    } | null>(null);

    const generator = new RandomGenerator();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }

        if (!game || game.completed) {
            dispatch(createNewGameThunk(currentUser!));
        } else {
            if (
                game!.movesUsed &&
                game.movesUsed >= MAX_MOVES &&
                !game.completed
            ) {
                dispatch(endGameThunk(currentUser!));
                navigate("/scores");
            }
        }
    }, [currentUser, game]);

    const handleCellClick = (row: number, col: number) => {
        if (!game) {
            return;
        }
        if (selectedCell) {
            dispatch(
                makeMoveThunk({
                    user: currentUser!,
                    from: selectedCell,
                    to: { row, col },
                    generator,
                })
            );
            setSelectedCell(null);
        } else {
            setSelectedCell({ row, col });
        }
    };

    const isMoving = (
        targetPiece: any,
        selectedCell: any,
        rowIndex: number,
        cellIndex: number
    ) => {
        if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex) {
            if (
                selectedCell?.row === rowIndex - 1 &&
                selectedCell?.col === cellIndex
            ) {
                return "moving-up";
            } else if (
                selectedCell?.row === rowIndex + 1 &&
                selectedCell?.col === cellIndex
            ) {
                return "moving-down";
            } else if (
                selectedCell?.row === rowIndex &&
                selectedCell?.col === cellIndex - 1
            ) {
                return "moving-left";
            } else if (
                selectedCell?.row === rowIndex &&
                selectedCell?.col === cellIndex + 1
            ) {
                return "moving-right";
            }
        } else if (
            selectedCell?.row === rowIndex &&
            selectedCell?.col === cellIndex
        ) {
            if (
                targetPiece?.row === rowIndex - 1 &&
                targetPiece?.col === cellIndex
            ) {
                return "moving-up";
            } else if (
                targetPiece?.row === rowIndex + 1 &&
                targetPiece?.col === cellIndex
            ) {
                return "moving-down";
            } else if (
                targetPiece?.row === rowIndex &&
                targetPiece?.col === cellIndex - 1
            ) {
                return "moving-left";
            } else if (
                targetPiece?.row === rowIndex &&
                targetPiece?.col === cellIndex + 1
            ) {
                return "moving-right";
            }
        }
        return "";
    };

    const boardHtml = game?.board?.state?.map((row, rowIndex) => (
        <div
            key={rowIndex}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {row.map((cell, cellIndex) => (
                <div
                    key={cellIndex}
                    onClick={() => handleCellClick(rowIndex, cellIndex)}
                    aria-disabled={inputDisabled}
                    className={isMoving(
                        targetPiece,
                        selectedCell,
                        rowIndex,
                        cellIndex
                    )}
                    style={{
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight:
                            selectedCell?.row === rowIndex &&
                            selectedCell?.col === cellIndex
                                ? "bold"
                                : "normal",
                    }}
                >
                    <div>{cell}</div>
                </div>
            ))}
        </div>
    ));

    return (
        <div>
            <h4
                style={{
                    textAlign: "center",
                }}
            >
                <strong>Score {game?.score}</strong>
                <br></br>
                <strong>Moves used {game?.movesUsed}</strong>
            </h4>
            <div>{boardHtml}</div>
        </div>
    );
};

export default GamePage;
