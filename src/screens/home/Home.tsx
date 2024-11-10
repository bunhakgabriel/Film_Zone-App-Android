import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { api } from "../../services/api"
import { MagnifyingGlass } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { CardMovie } from "../../components/CardMovies/CardMovie"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export const Home = ({ navigation }) => {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [noResult, setNoResult] = useState<boolean>(false)
    const [search, setSearch] = useState("");
    const [usuario, setUsuario] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('User')
            setUsuario(JSON.parse(user).user)
            if (!user) {
                navigation.navigate('Login');
            }
            loadMoreData();
        }
        fetchUser()
    }, [])

    const loadMoreData = async () => {
        setLoading(true);
        const response = await api.get("/movie/popular", {
            params: {
                page
            }
        });
        setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
        setPage(page + 1);
        setLoading(false);
    }

    const searchMovies = async (query: string) => {
        setLoading(true)
        const response = await api.get("/search/movie", {
            params: {
                query
            }
        })

        if (response.data.results.length === 0) {
            setNoResult(true);
            setSearchResultMovies([]);
        } else {
            setNoResult(false)
            setSearchResultMovies(response.data.results)
        }
        setLoading(false);
    }

    const handleSearch = (text: string) => {
        setSearch(text);
        if (text.length > 2) {
            searchMovies(text);
        } else {
            setSearchResultMovies([]);
        }
    }

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovie
            data={item}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
        />
    );

    const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: '#FFF',
                        }}
                    >
                        Olá {usuario}, seja Bem-Vindo(a)!
                    </Text>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor: '#FA5858', // Cor do botão opcional
                            borderRadius: 5,
                        }}
                        onPress={handleLogout}
                    >
                        <Text
                            style={{
                                color: '#fff',
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText} >O que você quer assistir hoje?</Text>
                <View style={styles.containerInput} >
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar"
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>

                {noResult && (
                    <Text style={styles.noResult} >
                        Nenhum filme encontrado para "{search}"
                    </Text>
                )}

            </View>
            <View>
                <FlatList
                    data={movieData}
                    numColumns={3}
                    renderItem={renderMovieItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 25,
                        paddingBottom: 100,
                        alignItems: 'center'
                    }}
                    onEndReached={() => loadMoreData()}
                    onEndReachedThreshold={0.5}
                />
                {loading && <ActivityIndicator size={50} color="#0296e5" />}
            </View>
        </View>
    )
}
