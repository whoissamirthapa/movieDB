import React, { useEffect } from 'react'
import classes from './favorite.module.css';
import MovieCard from '../../components/movieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../../actions/favoriteAction';

const favoriteMovie = [
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
    {
        title: "The Watchman",
        image: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        duration: 134,
        release_date: "2022"
    },
]

const Favorite = () => {

    const dispatch = useDispatch();
    const data = useSelector(state=>state.favorite.data);

    useEffect(()=>{
        dispatch(getFavorite());
    },[])

    return (
        <section className={classes.favorite_container}>
            <section className={classes.favorite_child}>
                <header className={classes.favorite_header}>
                    <span>Favorite Movies</span>
                </header>
                <section className={classes.favorite_here}>
                    { data && data.map((movie,key)=>{
                        return (
                            <MovieCard 
                                title={movie.movieTitle}
                                duration={movie.duration}
                                favorite = {true}
                                id={movie.movieId} 
                                release_date={movie.releasedYear}
                                urlImg ={movie.url}
                                key={key}
                            />
                        )
                    })}
                </section>
            </section>
        </section>
    )
}

export default Favorite