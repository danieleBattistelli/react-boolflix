import React, { useState, useRef } from 'react';
import axios from 'axios';
import Card from './Card';



const API_KEY = 'd8378e5955e3fe322e1b9067f63b668e';
const BASE_URL_MOVIE = 'https://api.themoviedb.org/3/search/movie';
const BASE_URL_TV = 'https://api.themoviedb.org/3/search/tv';



//Utilizziamo l'hook  useState  per definire e gestire lo stato del componente MovieSearch
const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movieResults, setMovieResults] = useState([]);
    const [tvResults, setTvResults] = useState([]);

    // Variabili per far wrappare la card
    const [moviePage, setMoviePage] = useState(0);
    const [tvPage, setTvPage] = useState(0);
    const movieWrapperRef = useRef(null);
    const tvWrapperRef = useRef(null);
    const ITEMS_PER_PAGE = 5;

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
                //resetto il numero di pagina quando faccio una nuova ricerca
                setMoviePage(0);
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
                //resetto il numero di pagina quando faccio una nuova ricerca
                setTvPage(0);
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

    // implemento lo scorrimento orizzontale delle card
    const scroll = (ref, setPage, currentPage, totalPages) => {
        if (currentPage + 1 < totalPages) {
            setPage(currentPage + 1);
            ref.current.scrollBy({
                left: ref.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };
    const scrollBack = (ref, setPage, currentPage) => {
        if (currentPage - 1 >= 0) {
            setPage(currentPage - 1);
            ref.current.scrollBy({
                left: -ref.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    const totalMoviePages = Math.ceil(movieResults.length / ITEMS_PER_PAGE);
    const totalTvPages = Math.ceil(tvResults.length / ITEMS_PER_PAGE);
    const movieResultsToShow = movieResults.slice(moviePage * ITEMS_PER_PAGE, (moviePage + 1) * ITEMS_PER_PAGE);
    const tvResultsToShow = tvResults.slice(tvPage * ITEMS_PER_PAGE, (tvPage + 1) * ITEMS_PER_PAGE);


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

                <div id="movie-results"
                    className="results-section">
                    <h2>Film</h2>
                    <span className="arrow arrow-left" onClick={() =>
                        scrollBack(movieWrapperRef, setMoviePage, moviePage)}>&#9664;
                    </span>
                    <div ref={movieWrapperRef} className="card-wrapper">
                        {movieResultsToShow.map(movie => (

                            <Card key={movie.id} result={movie} />

                        ))}
                    </div>
                    <span className="arrow arrow-right" onClick={() =>
                        scroll(movieWrapperRef, setMoviePage, moviePage, totalMoviePages)}>&#9654;
                    </span>
                </div>

                <div id="tv-results"
                    className="results-section">
                    <h2>Serie TV</h2>
                    <span className="arrow arrow-left" onClick={() =>
                        scrollBack(tvWrapperRef, setTvPage, tvPage)}>&#9664;
                    </span>
                    <div ref={tvWrapperRef} className="card-wrapper">
                        {tvResultsToShow.map(tv => (
                            <Card key={tv.id} result={tv} />

                        ))}
                    </div>
                    <span className="arrow arrow-right" onClick={() =>
                        scroll(tvWrapperRef, setTvPage, tvPage, totalTvPages)}>&#9654;
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MovieSearch;
