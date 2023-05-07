import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Films from "./pages/Films";
import Erro from "./pages/Erro";
import Favorites from "./pages/Favorites";

import Header from "./components/Header";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/films/:id" element={ <Films /> } />
                <Route path="/favorites" element={ <Favorites /> } />
                <Route path="*" element={ <Erro /> } />
            </Routes>
        </BrowserRouter>
    )
}