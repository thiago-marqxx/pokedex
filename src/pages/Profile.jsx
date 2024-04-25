import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useTheme } from "../contexts/ThemeContext";
import { typeHandlerSpan } from "../utils/PokemonType";
import "../scss/profile.scss"

export const Profile = ({ pokemonData }) => {
    const { id, name, sprites, types, moves, height, weight, stats, abilities } = pokemonData;
    const [abilityDetails, setAbilityDetails] = useState([]);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const fetchAbilityDetails = async () => {
            const abilityDetailsArray = await Promise.all(
                abilities.map(async (ability) => {
                    const response = await axios.get(ability.ability.url);
                    const entry = response.data.effect_entries.find((entry) => entry.language.name === "en");
                    return {
                        name: ability.ability.name,
                        short_effect: entry ? entry.short_effect : "No short effect available"
                    };
                })
            );
            setAbilityDetails(abilityDetailsArray);
        };

        fetchAbilityDetails();
    }, [abilities]);

    return (
        <>
            <Navbar hideSearch />
            <div className={`central ${theme}`}>
                <div className="card">
                    <div className="additional">
                        <div className="self-card">
                            <div className="id center">#{id}</div>
                            <div className="poke-type type center">{typeHandlerSpan(types)}</div>
                            <img src={sprites.front_default} alt={name} className="center" />
                        </div>
                        <div className="more-info">
                            <h1>{name}</h1>
                            <p><strong>Stats</strong></p>
                            <div className="stats">
                                <span>Height</span>
                                <span>{height}cm</span>
                            </div>
                            <div className="stats">
                                <span>Weight</span>
                                <span>{weight}g</span>
                            </div>
                            {stats.map((statsData, index) => (
                                <div className="stats" key={index}>
                                    <span>{statsData.stat.name}</span>
                                    <span>{statsData.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="general">
                        <h1>{name}</h1>
                        <div className="texts">
                            <p><strong>Abilities</strong></p>
                            {abilityDetails.map((ability, index) => (
                                <span key={index}>
                                    <strong>{ability.name}</strong> - {ability.short_effect}
                                    {index !== abilityDetails.length - 1 && ' '}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card2">
                    <h1>Moves</h1>
                    <div className="moves">
                        {moves.map((moveData, index) => (
                            <span key={index}>{moveData.move.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}