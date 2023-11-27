import { Generator } from "./board";

export function createRandomGenerator(pieces: string[]): Generator<string> {
    const nextIndex = (pieces: string[]) => {
        return Math.floor(Math.random() * pieces.length);
    };

    const next = (): string => {
        return pieces[nextIndex(pieces)];
    };

    return {
        next,
    };
}
