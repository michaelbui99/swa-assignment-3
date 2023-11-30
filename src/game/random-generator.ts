import { Generator } from "./board";

export class RandomGenerator implements Generator<string> {
    private pieces = ["A", "B", "C"];

    constructor() {}

    next(): string {
        return this.pieces[this.getNextPieceIndex()];
    }

    private getNextPieceIndex(): number {
        return Math.floor(Math.random() * this.pieces.length);
    }
}
