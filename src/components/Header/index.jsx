import './header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <Link className='logo' to='/'>Hums Films</ Link>

            <Link className='favoritos' to='/favorites'>Meus Filmes</Link>

        </header>
    )
}