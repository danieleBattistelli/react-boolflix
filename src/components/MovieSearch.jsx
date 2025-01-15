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
    const [movieResults, setMovieResults] = useState([]);
    const [tvResults, setTvResults] = useState([]);

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
                setMovieResults(movieResults);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);

            });

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

                setTvResults(tvResults);
            })
            .catch(error => {
                console.error('Error fetching TV shows:', error);
            });

    };

    //Aggiorno lo stato della  query con il valore attuale del campo di Input
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    //Implemento la ricerca anche premendo enter
    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    //Implemento l'utilizzo di bandiere presenti dentro public/img
    const getFlag = (language) => {
        if (language === 'en' || language === 'it') {
            return <img src={`/img/${language}.png`} style={{ width: '30px', height: 'auto' }} alt={`Flag of ${language}`} />;
        } else {
            return <img src="/img/placeholder.png" style={{ width: '30px', height: 'auto' }} alt="placeholder" />;
        }
    };

    //Implemento le stelle per il rating dei film
    const renderStars = (vote) => {
        const fullStars = Math.ceil(vote / 2);
        const emptyStars = 5 - fullStars;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} style={{ color: '#ffc107' }} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} style={{ color: '#e4e5e9' }} />);
        }
        return stars;
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
                placeholder="Inserisci il nome del film o della serie TV"
            />

            <button onClick={search}>Cerca</button>

            <div id="results">
                <div id="movie-results">
                    <h2>Film</h2>
                    {movieResults.map(movie => (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p><strong>Titolo Originale:</strong> {movie.originalTitle}</p>
                            <p><strong>Lingua:</strong> {getFlag(movie.language)}</p>
                            <p><strong>Voto:</strong> {renderStars(movie.vote)}</p>
                            <img src={IMAGE_BASE_URL + movie.posterPath} style={{ width: '150px', height: 'auto' }} alt={`${movie.title} Poster`} />
                        </div>
                    ))}
                </div>
                <div id="tv-results">
                    <h2>Serie TV</h2>
                    {tvResults.map(tv => (
                        <div key={tv.id}>
                            <h3>{tv.title}</h3>
                            <p><strong>Titolo Originale:</strong> {tv.originalTitle}</p>
                            <p><strong>Lingua:</strong> {getFlag(tv.language)}</p>
                            <p><strong>Voto:</strong> {renderStars(tv.vote)}</p>
                            <img src={IMAGE_BASE_URL + tv.posterPath} style={{ width: '150px', height: 'auto' }} alt={`${tv.title} Poster`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieSearch;
