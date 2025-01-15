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
                    placeholder="   Enter Film or TV Series"
                />
                <button onClick={handleSearch}>Cerca</button>
            </div>
        </div>
    );
};

export default Header;
