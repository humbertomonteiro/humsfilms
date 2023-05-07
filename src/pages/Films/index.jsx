import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './film.css'
import { toast } from "react-toastify"

import api from "../../services/api"

export default function Films() {

    const { id } = useParams()
    const navigation = useNavigate()

    const [film, setFilm ] = useState({})
    const [loading, setLoading ] = useState(true)

    useEffect(() => {
        async function loadFilms() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '95fba846009344fa2491a70861009197',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilm(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log('Filme não encontrado')
                navigation('/', { replace: true })
                return
            })
        }

        loadFilms()

        return() => {
            console.log('Componente foi desmontado')
        }

    }, [navigation, id])

    function saveFilm() {
        const myList = localStorage.getItem('@humsfilms')

        let filmsSaves = JSON.parse(myList) || []

        const hasFilm = filmsSaves.some((filmSave) => filmSave.id === film.id)

        if(hasFilm) {
            toast.warning('Esse filme já está na lista!')
            return
        }

        filmsSaves.push(film)
        localStorage.setItem('@humsfilms', JSON.stringify(filmsSaves))
        toast.success('Filme salvo com sucesso')
    }

    if(loading) {
        return (
            <div className="film-info">
                <h3>Carregando detalhes...</h3>
            </div>
        )
    }

    return (
        <div className="film-info">
            <h1>{film.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />
            <h3>Sinopse:</h3>
            <span>{film.overview}</span>
            <strong>Avaliação: {film.vote_average} / 10</strong>

            <div className="area-btns">
                <button onClick={saveFilm}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${film.title} Trailer`}
                    target="_blanck" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}