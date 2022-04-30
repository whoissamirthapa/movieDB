import React, { useEffect, useState } from 'react';
import { API_KEY, IMG_API, MOVIE_API, ORIGINAL } from '../../config';
import classes from './home.module.css';

const randValue = Math.floor(Math.random() * (325461 - 1000000) +1000000);
const firstImage = require('../../assets/welcome.png');

const FeaturedHome = () => {

    const [imgLoading, setImgLoading] = useState(false);
    const [img, setImg] = useState(firstImage);
    const [data, setData] = useState({});

    
    useEffect(()=>{
        if(randValue){
            const fetchRandom = async()=>{
                const res = await fetch(`${MOVIE_API}movie/${randValue}?api_key=${API_KEY}&language=en-US`);
                const data = await res.json();
                if(data){
                    setData(()=>{
                        return { ...data}
                    })
                }
            }
            fetchRandom();
            
        }
    },[randValue]);

    useEffect(()=>{

        if(data.backdrop_path && !data.adult){
            setImgLoading(true);
            const getImage = async()=>{
               fetch(`${IMG_API}${ORIGINAL}${data.backdrop_path}`,{
                    method: "GET",
                }).then((res)=>{
                    if(res.url){
                        setImg(res.url);
                    }
                });
                setImgLoading(false);
            }
            getImage();
        }

    },[data.backdrop_path]);
    
    return (
        <header className={classes.home_header}
        style={{
          background: `linear-gradient(to right, rgb(0,0,0,0.8), rgba(0, 0, 0,0)), url(${img && img}) no-repeat center top / cover`
        }}
        >
            <section className={classes.home_header_desc_container} >
                <header className={classes.home_header_header}>
                  { data.title && data.title}
                  { !data.title && "The Movie DB"}
                </header>
                <section className={classes.home_header_desc}>
                    <div className={classes.movie_tags}>
                        { data.genres && data.genres.map((genre)=>{ 
                            return (
                            <span key={genre.id}>{genre.name}</span> )})}
                    </div>
                    <div className={classes.home_header_main_desc}>
                        <p className={classes.first_overview}>Overview</p>
                        { !data.overview && "Welcome to Movie DB center. You can view more details about the movie of different categories like trending, popular, now playing, top rated and also you can search more movie or your favorite movie to get more knowledge upon"}
                        { data.overview && data.overview}
                    </div>
                </section>
            </section>
        </header>
    )
}

export default FeaturedHome