import { useEffect, useState } from "react";

const imgBaseURL = 'https://image.tmdb.org/t/p/w500'; 

function WishList () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let items = [];
        for(let i=0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (!key.indexOf('movie-')) {
                let movieItem = JSON.parse(localStorage.getItem(key));
                items.push(movieItem);
            }
        }
        setMovies(items);
    }, []);

    let items = null;
    if (movies && movies.length > 0) {
        items = movies.map((movie, index) => {
            return (
                <div key={index} className="movie">
                   <img src={imgBaseURL + movie.poster_path} alt={movie.title} />
                   <h2>{movie.title}</h2>
                   <p>{movie.overview}</p>
                </div>
            );
        });
    }

    return (
        <div>{items}</div>
    );
}

export default WishList;