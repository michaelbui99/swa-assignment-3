import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Score } from "../models/score";
import {Game } from "../models/game";
import { User } from "../models/user";

export interface ScoreState {
    value: allScore;
};


export type gameResponseDTO = {
    id: number;
    user: number;
    score: number;
    completed: boolean;
};

export type scoreDto = {
    userId: number;
    score: number;
    gameId: number;
};

export type userDto = {
    id: number;
    token: string;
};

export type allScore = {
    userScore: Score[];
    top10Score: Score[];
}

const initialState: ScoreState = {
    value: {userScore: [], top10Score: []}
};

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

const getAllGames = async function games(token: string): Promise<Game[] | undefined> {
    const baseUrl = "http://localhost:9090";
    const endpoint = `${baseUrl}/games?token=${token}`;
    const gamesResposne = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    try {
        return (await gamesResposne.json()) ?? undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
    
}

function getTop3ScoresForUser(userId: number, scores: Score[]): Score[] {
    const userScores = scores.filter(score => score.userId === userId);
    userScores.sort((a, b) => b.score - a.score);
    const top3Scores = userScores.slice(0, 3);
  
    return top3Scores;
  }

  function top10Scores(scores: Score[]): Score[] {
    const sortedGames = scores.sort((a, b) => b.score - a.score);
    const top10Games = sortedGames.slice(0, 10);

    return top10Games;
  }

export const gethighScores = createAsyncThunk<allScore, userDto>(
    "game/top10Scores",
    async (user, {rejectWithValue}) =>{
        const allGames: Game[] | undefined = await getAllGames(user.token); 
        const logedInUser: User | undefined = await getusebyId(user.id, user.token);
        if(!allGames){
            return rejectWithValue({userScore: [], top10Score: []});
        }
        let scoreList: Score[] = [];
        let finishedGames: Game[] = [];

        finishedGames = allGames.filter(game => game.completed = true);
        finishedGames.forEach(game => {
            scoreList.push({
                userId: game.user,
                score: game.score,
                gameId: game.id
            });
        });
        let top10Score = top10Scores(scoreList);
        let userScore: Score[];
        if(logedInUser === undefined || logedInUser === null){
            userScore = [];
        }
        userScore = getTop3ScoresForUser(logedInUser!.id, scoreList);
        return {userScore, top10Score}
    }
);



export const scoreSlcie = createSlice({
    name: "score",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(gethighScores.fulfilled, (state, action) => {
            state.value = action.payload;
            console.log("High scores: ", action.payload);
        });
    }
});

export default scoreSlcie.reducer;
