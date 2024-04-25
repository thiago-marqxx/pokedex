import React from 'react';
import { useTheme } from './ThemeContext';
import sunIcon from '../assets/sun.png';
import moonIcon from '../assets/moon.png';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="theme-toggle">
            <img src={theme === 'light' ? sunIcon : moonIcon} alt="Theme icon" />
        </button>
    );
};

export { ThemeToggle }