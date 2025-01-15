import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';



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

const Card = ({ result }) => {
    return (
        <div className="card">
            <img src={IMAGE_BASE_URL + result.posterPath} alt={`${result.title} Poster`} />
            <div className="info">
                <h3>{result.title}</h3>
                <p><strong>Titolo Originale:</strong> {result.originalTitle}</p>
                <p><strong>Lingua:</strong> {getFlag(result.language)}</p>
                <p><strong>Voto:</strong> {renderStars(result.vote)}</p>
            </div>
        </div>
    );
};

export default Card;
