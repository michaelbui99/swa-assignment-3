import React, { useEffect, useState } from "react";
import { canMove, move } from "../game/board";
import "../App.css";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import { createGameThunk, updateGameThunk } from "../app/features/thunks";
import { createRandomGenerator } from "../game/random-generator";

export interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
    
    const dispatch = useAppDispatch();
    const game = useAppSelector((state: RootState) => state.game.value);
    const currentUser = useAppSelector((state: RootState) => state.user.value);

    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [targetPiece, setTargetPiece] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [inputDisabled, setInputDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        
        if (!game) {
            dispatch(createGameThunk(currentUser));
        }
        
    }, [currentUser, game]);

    const handleCellClick = (row: number, col: number) => {
        if (!game) {
            return;
        }
        if (selectedCell) {
            if (canMove(game?.board, selectedCell, { row, col })) {
                swapPieces(row, col);
            } else {
                setSelectedCell(null);
            }
        } else {
            setSelectedCell({ row, col });
        }
    };

    const swapPieces = (row: number, col: number) => {
        if (!game) {
            return;
        }
        if (selectedCell && !inputDisabled && currentUser) {
            setTargetPiece({ row, col });
            setInputDisabled(true);
            const moved = move(createRandomGenerator(), game?.board, selectedCell, { row, col });
            
            console.log("moved", moved.effects.filter((e) => e.kind === "Match"));
            let matched = moved.effects.filter((e) => e.type === "Match");
            console.log("matched", matched);
            setTimeout(() => {
                dispatch(updateGameThunk(currentUser, { ...game, board: moved.board}));
                setSelectedCell(null);
                setTargetPiece(null);
                setInputDisabled(false);
            }, 500);
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


    const boardHtml = game?.board?.state.map((row, rowIndex) => (
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
            </h4>
            <div>{boardHtml}</div>
        </div>
    );
};

export default GamePage;
