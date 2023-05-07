import { useEffect, useState } from 'react'
import './favorites.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Favorites() {

    const [ films, setFilms ] = useState([])

    useEffect(() => {
        const myList = localStorage.getItem("@humsfilms")
        setFilms(JSON.parse(myList) || [])
    }, [])

    function deleteFilm(id) {
        let filterFilms = films.filter((item) => (item.id !== id))
        setFilms(filterFilms)
        localStorage.setItem("@humsfilms", JSON.stringify(filterFilms))
        toast.success('Filme removido com sucesso!  ')
    }

    return(
        <div className='my-films'>
            <h1>Meus Filmes</h1>

            {films.length === 0 && <span>Você não tem nenhum filme salvo :(</span>}

            <ul>
                {films.map((film) => {
                    return (
                        <li key={film.id}>
                            <span>{film.title}</span>
                            <div>
                                <Link to={`/films/${film.id}`}>Ver detalhes</Link>
                                <button onClick={() => deleteFilm(film.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}