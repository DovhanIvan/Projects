import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const baseURL = 'https://api.themoviedb.org';
const apiKey = '868a02f40c72f51da813c09cce31861f';
const singleMovie = '/3/movie/';
const imgBaseURL = 'https://image.tmdb.org/t/p/w500'; 

function SingleMovie () {
    const movieId = useParams().id;
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    function getMovie () {
        let url = baseURL + singleMovie + movieId ;
        let params = {
            api_key: apiKey,
        }
        axios.get(url, { params: params })
            .then(response => {
                setMovie(response.data);
                console.log(response.data.results)
            })
            .catch(error => {
                setError(error.message);
            })
    }

    useEffect(() => {
        getMovie();
    }, []);

    if (error) {
        return <h2>{error}</h2>;
    } else if (movie) {
        return (
        <div className='movie'>
                <img src={imgBaseURL + movie.poster_path} alt={movie.title}/>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
        </div>
        )
    }
}

export default SingleMovie;