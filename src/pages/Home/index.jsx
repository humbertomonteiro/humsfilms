import { useEffect, useState } from 'react'
import api from '../../services/api'

import { Link }  from 'react-router-dom'

import './home.css'

export default function Home() {

    const [ films, setFilms ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(()=> {

        async function loadFilms() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '95fba846009344fa2491a70861009197',
                    language: 'pt-BR',
                    page: 1,
                }
                
            })

            // console.log(response.data.results.slice(0, 10))
            setFilms(response.data.results.slice(0, 10))
            setLoading(false)
        }

        loadFilms()

    }, [])

    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div>
            <div className="list-films">
                {films.map(film => (
                    <article className='film' key={film.id}>
                        <strong>{film.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                        <Link to={`/films/${film.id}`} >Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    )
}