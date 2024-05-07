import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import './main_slider.scss';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = '868a02f40c72f51da813c09cce31861f';
const allMovies = '/movie/popular';
const imgBaseURL = 'https://image.tmdb.org/t/p/original'; 

function MainSlider () {
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);

    function getMovies () {
        let url = baseURL + allMovies;
        let params = {
            api_key: apiKey,
        }
        axios.get(url, { params: params })
            .then(response => {
                setMovies(response.data.results);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    useEffect(() => {
        getMovies();
}, []);
if (error) {
    return <h2>{error}</h2>;
} else if (movies) {
    let items = movies.slice(0,5).map((movie, index) => (
        <SwiperSlide>
        <div key={index} className="movie">
            <Link to={"/movies/" + movie.id} className="Link">
                <img src={imgBaseURL + movie.poster_path} alt={movie.title}/>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
            </Link>
        </div>
        </SwiperSlide>
    ));
    return (
        <Swiper
        modules={[Autoplay]}
        className="main-slider"
             slidesPerView={1}
             autoplay={{
                delay: 1500,
                disableOnInteraction: false
             }} 
        >
        {items}
    </Swiper>
)
}
}

export default MainSlider;