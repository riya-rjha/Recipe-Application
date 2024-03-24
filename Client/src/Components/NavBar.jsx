// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold">Recipe App</Link>
                <div className="flex items-center">
                    <Link to="/auth" className="text-white mr-4 hover:text-gray-300">Authentication</Link>
                    <Link to="/create" className="text-white mr-4 hover:text-gray-300">Create Recipes</Link>
                    <Link to="/saved" className="text-white hover:text-gray-300">Saved Recipes</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
