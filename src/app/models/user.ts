import { Game } from "./game";

export type User = {
    id: number;
    username: string;
    password: string;
    admin: boolean;
    token?: string;
    displayName?: string;
    profileImageUrl?: string;
    games: Game[];
};
