import React, { useState } from "react";
import { canMove, create, move, score } from "../game/board";
import { SequenceGenerator } from "../game/init";
import "../App.css";

export interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
  const generator = new SequenceGenerator("ABA");
  const [board, setBoard] = useState(create(generator, 5, 5));
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [targetPiece, setTargetPiece] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [matches, setMatches] = useState<any[] | null>(null);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (selectedCell) {
      if (canMove(board, selectedCell, { row, col })) {
        swapPieces(row, col);
      } else {
        setSelectedCell(null);
      }
    } else {
      setSelectedCell({ row, col });
    }
  };

  const swapPieces = (row: number, col: number) => {
    if (selectedCell && !inputDisabled) {
      setTargetPiece({ row, col });
      setInputDisabled(true);
      setTimeout(() => {
        let next  = move(generator, board, selectedCell, { row, col })
        setBoard(next.board);
        setSelectedCell(null);
        setTargetPiece(null);
        setInputDisabled(false);
      }, 500);
    }
  };

  const isMoving = (targetPiece: any, selectedCell: any, rowIndex: number, cellIndex: number) => {
    if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex) {
        if (selectedCell?.row === rowIndex - 1 && selectedCell?.col === cellIndex) {
            return "moving-up";
        } else if (selectedCell?.row === rowIndex + 1 && selectedCell?.col === cellIndex) {
            return "moving-down";
        } else if (selectedCell?.row === rowIndex && selectedCell?.col === cellIndex - 1) {
            return "moving-left";
        } else if (selectedCell?.row === rowIndex && selectedCell?.col === cellIndex + 1) {
            return "moving-right";
        }
    } else if (selectedCell?.row === rowIndex && selectedCell?.col === cellIndex) {
        if (targetPiece?.row === rowIndex - 1 && targetPiece?.col === cellIndex) {
            return "moving-up";
        } else if (targetPiece?.row === rowIndex + 1 && targetPiece?.col === cellIndex) {
            return "moving-down";
        } else if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex - 1) {
            return "moving-left";
        } else if (targetPiece?.row === rowIndex && targetPiece?.col === cellIndex + 1) {
            return "moving-right";
        }
    }
    return "";
};




  const boardHtml = board.state.map((row, rowIndex) => (
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
          className={
          
            isMoving(targetPiece, selectedCell, rowIndex, cellIndex)}
          style={{
            cursor: "pointer",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight:
              selectedCell?.row === rowIndex && selectedCell?.col === cellIndex
                ? "bold"
                : "normal",
          }}
        >
          <div>
            {cell}
          </div>
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
        <strong>Score {score}</strong>
      </h4>
      <div>{boardHtml}</div>
    </div>
  );
};

export default GamePage;
