import React from 'react'
import { useTheme } from '../../contexts/theme-context'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-richblack-25 hover:bg-richblack-700 transition-all duration-200"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FiMoon size={22} /> : <FiSun size={22} />}
        </button>
    )
}

export default ThemeToggle
