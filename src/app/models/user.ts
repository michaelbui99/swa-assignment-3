export type User = {
    id: number;
    username: string;
    password: string;
    admin: boolean;
    token?: string;
    displayName?: string;
    profileImageUrl?: string;
};
