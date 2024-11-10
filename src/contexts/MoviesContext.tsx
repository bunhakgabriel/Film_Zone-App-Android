import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";

type Movie = {
    id: number;
    title: string;
    runtime: string;
    release_date: string;
    vote_average: number;
}

type MovieContextData = {
    favoriteMovies: number[];
    allFavoriteMovies: Movie[];
}

export const MovieContext = createContext<MovieContextData>({
    favoriteMovies: [],
    allFavoriteMovies: []
})

type MovieProviderProps = {
    children: React.ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
    const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
    const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const loadFavoriteMovies = async () => {
            const favoriteMovies = await AsyncStorage.getItem("@FavoriteMovies");
            if(favoriteMovies) {
                setFavoriteMovies(JSON.parse(favoriteMovies));
            }
        }
        loadFavoriteMovies();
    }, [])

    const contextData: MovieContextData = {
        favoriteMovies,
        allFavoriteMovies
    }

    return (
        <MovieContext.Provider value={contextData}>
            {children}
        </MovieContext.Provider>
    )
}