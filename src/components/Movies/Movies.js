import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import './_movies.scss';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = '868a02f40c72f51da813c09cce31861f';
const allMovies = '/movie/popular';
const searchMovies = '/search/movie';
const imgBaseURL = 'https://image.tmdb.org/t/p/w500'; 


function Movies () {
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [Liked, setLiked] = useState(() => {
        let items =[];
        for(let i=0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (!key.indexOf('movie-')) {
                items.push(Number(key.replace('movie-', '')));
            }
        }
        return items;
    });
    const [total_pages, setTotalPages] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
function searchMovie (e) {
        e.preventDefault();
        getMovies (search);
    }

function getMovies(search, page) {
        let url = baseURL + (search ? searchMovies : allMovies);
        let params = search ? {api_key: apiKey, query: search, page: page} : {api_key: apiKey, page: page};
    
        if (search) {
            params.query = search;
        }
    
        axios.get(url, { params: params })
            .then(response => {
                setMovies(response.data.results);
                response.data.total_pages > 500 ? setTotalPages(500) : setTotalPages(response.data.total_pages)
                // setTotalPages(response.data.total_pages)
            })
            .catch(error => {
                setError(error.message);
            });
    }

function setMoviesPage (e, value) {
    let page = value
    setPage(page);
    getMovies (search, page)
}

function wishlist (event) {
    event.preventDefault();
    let id = Number(event.target.getAttribute('data-movie-id'));
    let isFavourited = Liked.includes(id);
    if (!isFavourited) {
        let newItem = [...Liked, id]
        setLiked(newItem);
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === id) {
                window.localStorage.setItem('movie-'+id, JSON.stringify(movies[i]));
            }
        }
    } else {
        let newItem = Liked.filter((savedId) => savedId !== id)
        setLiked(newItem);
        window.localStorage.removeItem('movie-' +id, );
    }
}

    useEffect(() => {
        getMovies();
    }, []);

    if (error) {
        return <h2>{error}</h2>;
    } else if (movies) {
        let items = movies.map((movie, index) => (
            <div key={index} className="movie">
                <div 
                onClick={wishlist} 
                data-movie-id={movie.id} 
                className={Liked.includes(movie.id) ? 'wishlist active' : 'wishlist'}
                ></div>
                  <img src={imgBaseURL + movie.poster_path} alt={movie.title}/>
                    <Link to={"/movies/" + movie.id} className="Link">
                      <h2>{movie.title}</h2>
                    </Link>
                      <p>{movie.overview}</p>
            </div>
        ));
        return (
            <div className="container">
                <form onSubmit={searchMovie} className="search">
                    <div className="form-items">
                        <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                       <button type='submit'>Search</button> 
                    </div>
                </form>
              <div className='movies'>{items}</div> 
              <div className='pagination'>
                <Stack spacing={2}>
                    <Pagination onChange={setMoviesPage} count={total_pages} />
                </Stack>
              </div>

            </div>
        )
    }
}

export default Movies;