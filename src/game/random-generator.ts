import { Generator } from "./board";

function createRandomGenerator(): Generator<string> {
    const pieces = ["A", "B", "C"];

    function next(): string {
        return pieces[getNextPieceIndex()];
    }

    function getNextPieceIndex(): number {
        return Math.floor(Math.random() * pieces.length);
    }

    return { next };
}

export { createRandomGenerator };
