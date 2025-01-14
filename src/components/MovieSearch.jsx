import axios from "axios";
import { useState } from "react";
import Flag from 'react-world-flags';


//Costanti per la chiamata axios
const API_KEY = 'd8378e5955e3fe322e1b9067f63b668e';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';


const MovieSearch = () => {
    //Utilizziamo l'hook  useState  per definire e gestire lo stato del componente MovieSearch
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);



    const searchMovie = () => {
        const url = `${BASE_URL}?api_key=${API_KEY}&query=${query}&language=it-IT`
        axios.get(url)
            .then(response => {
                setMovies(response.data.results);
            })
            .catch(error => {
                console.error('Error', error);
            });
    };

    //Vado ad aggiornare lo stato della  query con il valore attuale del campo di Input
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const getFlag = (language) => {
        if(language === 'en' || language === 'it'){
            return <img src={`/img/${language}.png`} 
            className="flag" 
            alt={`Flag of ${language}`}
            style={{ width: '30px', height: 'auto' }} 
        />;
        } else {
            return <img src={'/img/placeholder.png'} 
            className="flag" 
            alt="Unknown flag"
            style={{ width: '30px', height: 'auto' }} 
            />;
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Inserisci il nome del film"
            />
            <button onClick={searchMovie}>Cerca</button>
            <div id="results">
                {movies.map(movie => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p><strong>Titolo Originale:</strong>{movie.original_title}</p>
                        <p><strong>Lingua:</strong> {getFlag(movie.original_language)}</p>
                        <p><strong>Voto:</strong>{movie.vote_average}</p>
                    </div>
                ))}

            </div>
        </div>
    );


};

export default MovieSearch