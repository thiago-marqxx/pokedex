import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home"
import { Profile } from "./Profile"

const Router = () => {
    const [pokemonData, setPokemonData] = useState();

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home setPokemonData={setPokemonData} />} />
                <Route exact path="/profile" element={<Profile pokemonData={pokemonData} />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Router }