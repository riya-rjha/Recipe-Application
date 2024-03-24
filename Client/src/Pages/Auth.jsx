import React from 'react';
import Login from '../Components/Login';
import Register from '../Components/Register';

const Auth = () => {
    return (
        <div className='flex items-center justify-center'>
            <Register />
            <Login />
        </div>
    )
}

export default Auth