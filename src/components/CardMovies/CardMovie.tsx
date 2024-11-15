import { View,Text, Pressable, Image } from "react-native"
import { styles } from "./styles";

interface Movie{
    id: number;
    poster_path: string;
}

interface Props{
    data: Movie;
    onPress?: () => void;
}

export const CardMovie = ({data, ...rest}: Props) => {
    return (
        <Pressable {...rest} style={styles.cardMovies} >
            <Image 
            source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}} 
            style={styles.cardImage}
            />
        </Pressable>
    )
}