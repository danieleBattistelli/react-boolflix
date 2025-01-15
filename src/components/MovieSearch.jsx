import React, { useRef, useContext } from 'react';
import Card from './Card';
import Header from './Header';
import { AppContext, AppProvider } from '../context/AppContext';

const MovieSearch = () => {
    const { movieResults, tvResults, moviePage, tvPage, ITEMS_PER_PAGE, scroll, scrollBack } = useContext(AppContext);
    const movieWrapperRef = useRef(null);
    const tvWrapperRef = useRef(null);
    const totalMoviePages = Math.ceil(movieResults.length / ITEMS_PER_PAGE);
    const totalTvPages = Math.ceil(tvResults.length / ITEMS_PER_PAGE);
    const movieResultsToShow = movieResults.slice(moviePage * ITEMS_PER_PAGE, (moviePage + 1) * ITEMS_PER_PAGE);
    const tvResultsToShow = tvResults.slice(tvPage * ITEMS_PER_PAGE, (tvPage + 1) * ITEMS_PER_PAGE);

    return (

        <div>
            <Header />
            <div id="results">
                <div id="movie-results" className="results-section">
                    <h2>Film</h2>
                    <span className="arrow arrow-left" onClick={() => scrollBack(movieWrapperRef, setMoviePage, moviePage)}>&#9664;</span>
                    <div ref={movieWrapperRef} className="card-wrapper">
                        {movieResultsToShow.map(movie => (
                            <Card key={movie.id} result={movie} />
                        ))}
                    </div>
                    <span className="arrow arrow-right" onClick={() => scroll(movieWrapperRef, setMoviePage, moviePage, totalMoviePages)}>&#9654;</span>
                </div>
                <div id="tv-results" className="results-section">
                    <h2>Serie TV</h2>
                    <span className="arrow arrow-left" onClick={() => scrollBack(tvWrapperRef, setTvPage, tvPage)}>&#9664;</span>
                    <div ref={tvWrapperRef} className="card-wrapper">
                        {tvResultsToShow.map(tv => (
                            <Card key={tv.id} result={tv} />
                        ))}
                    </div>
                    <span className="arrow arrow-right" onClick={() => scroll(tvWrapperRef, setTvPage, tvPage, totalTvPages)}>&#9654;</span>
                </div>
            </div>
        </div>

    );
};

export default MovieSearch;
