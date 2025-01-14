import { response } from "express";
import { useState } from "react";



//Costanti per la chiamata axios
const API_KEY = 'd8378e5955e3fe322e1b9067f63b668e';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const MovieSearch = () => {
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

    const handleInputChange = (event) => {
        setQuery(event.target.value);
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
                        <p><strong>Lingua</strong>{movie.original_language}</p>
                        <p><strong>Voto</strong>{movie.vote_average}</p>
                    </div>
                ))}

            </div>
        </div>
    );


};

export default MovieSearch