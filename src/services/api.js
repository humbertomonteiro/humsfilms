import axios from 'axios'
// https://api.themoviedb.org/3/movie/550?api_key=95fba846009344fa2491a70861009197


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api