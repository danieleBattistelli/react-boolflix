import React, { useState } from 'react';
import axios from 'axios';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const API_KEY = 'd8378e5955e3fe322e1b9067f63b668e';
const BASE_URL_MOVIE = 'https://api.themoviedb.org/3/search/movie';
const BASE_URL_TV = 'https://api.themoviedb.org/3/search/tv';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';


//Utilizziamo l'hook  useState  per definire e gestire lo stato del componente MovieSearch
const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const search = () => {
        const urlMovie = `${BASE_URL_MOVIE}?api_key=${API_KEY}&query=${query}&language=it-IT`;
        const urlTv = `${BASE_URL_TV}?api_key=${API_KEY}&query=${query}&language=it-IT`;

        axios.get(urlMovie)
            .then(movieResponse => {
                const movieResults = movieResponse.data.results.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    originalTitle: movie.original_title,
                    language: movie.original_language,
                    vote: movie.vote_average,
                    posterPath: movie.poster_path,
                    type: 'movie'
                }));

                axios.get(urlTv)
                    .then(tvResponse => {
                        const tvResults = tvResponse.data.results.map(tv => ({
                            id: tv.id,
                            title: tv.name,
                            originalTitle: tv.original_name,
                            language: tv.original_language,
                            vote: tv.vote_average,
                            posterPath: tv.poster_path,
                            type: 'tv'
                        }));

                        setResults([...movieResults, ...tvResults]);
                    })
                    .catch(error => {
                        console.error('Error fetching TV shows:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    };


    //Vado ad aggiornare lo stato della  query con il valore attuale del campo di Input
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const getFlag = (language) => {    
        if (language === 'en' || language === 'it') {
            return <img src={`/img/${language}.png`} style={{ width: '30px', height: 'auto' }} alt={`Flag of ${language}`} />;
        } else {
            return <img src="/img/placeholder.png" style={{ width: '30px', height: 'auto' }} alt="placeholder" />;
        }
    };

    const renderStars = (vote) => { 
        const fullStars = Math.ceil(vote / 2); 
        const emptyStars = 5 - fullStars; 
        const stars = []; 
        for (let i = 0; i < fullStars; i++) { 
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} style={{ color: '#ffc107' }} />); 
        } 
        for (let i = 0; i < emptyStars; i++) { stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} style={{ color: '#e4e5e9' }} />); 
    } 
    return stars; 
};

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Inserisci il nome del film o della serie TV"
            />
            <button onClick={search}>Cerca</button>
            <div id="results">
                {results.map(result => (
                    <div key={result.id}>
                        <h3>{result.title}</h3>
                        <p><strong>Titolo Originale:</strong> {result.originalTitle}</p>
                        <p><strong>Lingua:</strong> {getFlag(result.language)}</p>
                        <p><strong>Voto:</strong> {renderStars(result.vote)}</p>
                        <p><strong>Tipo:</strong> {result.type === 'movie' ? 'Film' : 'Serie TV'}</p>
                        <img src={IMAGE_BASE_URL + result.posterPath} style={{ width: '150px', height: 'auto' }} alt={`${result.title} Poster`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
