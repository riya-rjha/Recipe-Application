// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const logout = () => {
        setCookies('access_token', "");
        window.localStorage.removeItem('userID');
        navigate('/');
    }

    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-white text-lg font-semibold">
                    Recipe App
                </Link>
                <div className="flex items-center justify-center">
                    <Link
                        to="/create"
                        className="text-white mr-4 hover:text-gray-300">
                        Create Recipes
                    </Link>
                    <Link
                        to="/saved"
                        className="text-white mr-4 hover:text-gray-300">
                        Saved Recipes
                    </Link>
                    {!cookies.access_token ? (<Link to="/auth" className="text-white mr-4 hover:text-gray-300">Authentication</Link>
                    ) : (<button onClick={logout}
                        className='text-white mr-12 hover:text-gray-300'>
                        Logout
                    </button>)}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
