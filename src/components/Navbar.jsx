import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { ThemeToggle } from "../contexts/ThemeToggle";
import pokeLogo from '../assets/pokeball.png';
import "../scss/navbar.scss"

const Navbar = ({ pokemonFilter, hideSearch, onTypeSelect }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleTypeSelect = (type) => {
        onTypeSelect(type);
        toggleDropdown();
    }

    const handleInputChange = (event) => {
        pokemonFilter(event.target.value);
    };

    return (
        <div>
            <nav className="navigation">
                <a href="/">
                    <img src={pokeLogo} alt="pokebola" className="logo" />
                </a>
                {!hideSearch && (
                    <>
                        <div className="bars">
                            <div className="dropdown">
                                <button className="dropbtn" onClick={toggleDropdown} ><FaFilter /></button>
                                {isDropdownOpen && (
                                    <div className="dropdown-content">
                                        {types.map((type, index) => (
                                            <button className={type} key={index} onClick={() => handleTypeSelect(type)} >{type}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <form role="search">
                                <input type="search" placeholder="Search..." autoFocus required
                                    onChange={handleInputChange} />
                            </form>
                        </div>
                    </>
                )}
                <ThemeToggle />
            </nav>
        </div>
    )
}

export { Navbar }