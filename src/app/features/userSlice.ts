import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { Game } from "../models/game";

export interface UserState {
    value: User | undefined;
}

export type LoginRequestDTO = {
    username: string;
    password: string;
};

export type LoginResponseDTO = {
    token: string;
    userId: number;
};

const initialState: UserState = {
    value: undefined,
};

export const updateUser = createAsyncThunk<User, User>(
    "user/updateUser",
    async (user, { rejectWithValue }) => {
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/users/${user.id}?token=${user.token}`;
        const response = await fetch(endpoint, {
            body: JSON.stringify({
                displayName: user.displayName,
                profileImageUrl: user.profileImageUrl,
            }),
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(undefined);
        }
        return user;
    }
);

export const createUser = createAsyncThunk<undefined, User>(
    "user/createUser",
    async (user, { rejectWithValue }) => {
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/users`;
        const response = await fetch(endpoint, {
            body: JSON.stringify(user),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(data);
        }
        return undefined;
    }
);

async function getAllGames(token: string): Promise<Game[]> {
    const baseUrl = "http://localhost:9090";
    const endpoint = `${baseUrl}/games?token=${token}`;
    const response = await fetch(endpoint);
    return (await response.json()) as Game[];
}

const getusebyId = async function getuserById(
    userId: number,
    token: string
): Promise<User | undefined> {
    const baseUrl = "http://localhost:9090";
    const endpoint = `${baseUrl}/users/${userId}?token=${token}`;
    const response = await fetch(endpoint);

    try {
        return (await response.json()) ?? undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export const loginUser = createAsyncThunk<User | undefined, LoginRequestDTO>(
    "user/loginUser",
    async (loginDTO, { rejectWithValue }) => {
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/login`;
        const loginResponse = await fetch(endpoint, {
            body: JSON.stringify(loginDTO),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const loginData: LoginResponseDTO = await loginResponse.json();
        console.log(loginData);
        if (loginResponse.status < 200 || loginResponse.status >= 300) {
            return rejectWithValue(undefined);
        }

        const user: User | undefined = await getusebyId(
            loginData.userId,
            loginData.token
        );
        if (!user) {
            return undefined;
        }

        user.token = loginData.token;
        const games = await getAllGames(user.token);
        user.games = games.filter((game) => game.user === user.id);
        console.log(user);
        return user;
    }
);

export const logoutUser = createAsyncThunk<undefined, User>(
    "user/logoutUser",
    async (user, { rejectWithValue }) => {
        const baseUrl = "http://localhost:9090";
        const endpoint = `${baseUrl}/logout?token=${user.token}`;
        const logoutResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (logoutResponse.status < 200 || logoutResponse.status >= 300) {
            return rejectWithValue(user);
        }

        return undefined;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log("User created: ", action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            // TODO: think about how to do this.
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.value = action.payload;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.value = action.payload;
        });
        builder.addCase(logoutUser.rejected, (state, _) => {
            state.value = state.value;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export default userSlice.reducer;
