import React, { createContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_KEY = 'd8378e5955e3fe322e1b9067f63b668e';
const BASE_URL_MOVIE = 'https://api.themoviedb.org/3/search/movie';
const BASE_URL_TV = 'https://api.themoviedb.org/3/search/tv';

const AppProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const [movieResults, setMovieResults] = useState([]);
    const [tvResults, setTvResults] = useState([]);
    const [moviePage, setMoviePage] = useState(0); 
    const [tvPage, setTvPage] = useState(0);

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
                setTvPage(0);
            })
            .catch(error => {
                console.error('Error fetching TV shows:', error);
            });
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const handleSearch = () => {
        search();
    };

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

    return (
        <AppContext.Provider value={{
            query,
            setQuery,
            movieResults,
            tvResults,
            moviePage,
            tvPage,
            ITEMS_PER_PAGE,
            search,
            handleInputChange,
            handleKeyUp,
            handleSearch,
            scroll,
            scrollBack
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
