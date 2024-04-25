import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { PokemonCard } from "../components/PokemonCard";
import { useTheme } from "../contexts/ThemeContext";
import "../scss/home.scss"

export const Home = ({ setPokemonData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [list, setList] = useState(11);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        getPokemons();
    }, [list]);

    const getPokemons = () => {
        let endpoints = [];

        for (let i = 1; i < list; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => setPokemons(res.map(response => response.data)))
            .catch((error) => console.error('Erro ao buscar os pokémons:', error));
    };

    const handleIncrement = () => {
        setList(list + 10);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value.trim().toLowerCase();
        setSearchTerm(value);
        if (value !== '') {
            searchPokemon(value);
        } else {
            getPokemons();
        }
    };

    const searchPokemon = (name) => {
        const lowercaseName = name.toLowerCase().trim();

        if (lowercaseName === '') {
            getPokemons();
            return;
        }

        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
            .then((res) => {
                const filteredPokemons = res.data.results.filter(pokemon => pokemon.name.includes(lowercaseName));
                return Promise.all(filteredPokemons.map(pokemon => axios.get(pokemon.url)));
            })
            .then((pokemonDataArray) => {
                const filteredPokemonData = pokemonDataArray.map(response => response.data);
                setPokemons(filteredPokemonData);
            })
            .catch((error) => {
                console.error('Erro ao buscar os Pokémon:', error);
                setPokemons([]);
            });
    };

    const handleTypeSelect = (type) => {
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            .then(response => {
                const pokemonPromises = response.data.pokemon.map(pokemon => axios.get(pokemon.pokemon.url));
                return axios.all(pokemonPromises);
            })
            .then(pokemonResponses => {
                const pokemonData = pokemonResponses.map(response => response.data);
                setPokemons(pokemonData);
            })
            .catch(error => console.error('Erro ao buscar os pokémons do tipo:', error));
    };

    const pokemonPickHandler = (pokemonData) => {
        setPokemonData(pokemonData);
        navigate("/profile");
    };

    return (
        <>
            <Navbar pokemonFilter={searchPokemon} handleSearchChange={handleSearchChange} onTypeSelect={handleTypeSelect} />
            <div className={`home ${theme === 'light' ? 'light' : 'dark-mode'}`}>
                <main>
                    <div className="listagem-pokemon">
                        {pokemons.map((pokemon, index) => (
                            <div key={index} onClick={() => pokemonPickHandler(pokemon)} >
                                <PokemonCard
                                    name={pokemon.name}
                                    image={pokemon.sprites.front_default}
                                    types={pokemon.types} />
                            </div>
                        ))}
                    </div>
                    <div className="local-btn">
                        <button onClick={handleIncrement} className="btn">Load More</button>
                    </div>
                </main>
            </div>
        </>
    )
}