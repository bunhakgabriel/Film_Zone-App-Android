import axios from 'axios'

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "74136251623bd31e7087487501f55d32",
        language: "pt-BR",
        include_adult: false
    }
})