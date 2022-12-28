import React from 'react';


function Logout() {

    const logout =() => {
        window.amazon.Pay.signout();
    }
    return (
        <div onClick={logout}>
            Logout
        </div>
    );

}

export default Logout;