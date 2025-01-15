import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const Header = () => {
    const { query, setQuery, handleKeyUp, handleSearch } = useContext(AppContext);

    return (
        <div className="header">
            <img src={"/img/logo.png"} alt="Logo" className="logo" />
            <div className="search">
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={handleKeyUp}
                    placeholder="Inserisci il nome del film o della serie TV"
                />
                <button onClick={handleSearch}>Cerca</button>
            </div>
        </div>
    );
};

export default Header;
