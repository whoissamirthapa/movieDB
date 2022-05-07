import React, { useState, useEffect } from 'react'
import classes from './moviedetail.module.css';
import { useParams } from 'react-router-dom';
import CastCard from '../../components/castCard';
import Comment from './comment';
import { API_KEY, IMDB_API, IMG_API, MOVIE_API, ORIGINAL } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../../actions/favoriteAction';
import { favoriteActions } from '../../reducers/favoriteReducer';
const img = "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";


const MovieDetail = () => {

    const dispatch = useDispatch();
    const message = useSelector(state=>state.favorite.message);
    const error = useSelector(state=>state.favorite.error);
    
    const token = useSelector(state=>state.auth.token);
    const tokenL = localStorage.getItem("userToken");
    const params = useParams();
    const id = params.id;
    const [castInfo, setCastInfo] = useState(false);
    const [cast, setCast] = useState([]);
    const [data, setData] = useState({});
    const [backdropImg, setBackdropImg] = useState(img)
    const [posterImg, setPosterImg] = useState(img)
    const [video, setVideo] = useState("");

    useEffect(()=>{
        if(id){
            const fetchRandom = async()=>{
                const res = await fetch(`${MOVIE_API}movie/${id}?api_key=${API_KEY}&language=en-US`);
                const resData = await res.json();
                if(resData){
                    setData(()=>{
                        return { ...resData}
                    })
                }
            }
            fetchRandom();
        }
    },[id]);

    useEffect(()=>{
        if(data.backdrop_path){
            const getImage = async()=>{
                fetch(`${IMG_API}${ORIGINAL}${data.backdrop_path}`,{
                     method: "GET",
                 }).then((res)=>{
                     if(res.url){
                         setBackdropImg(res.url);
                     }
                 });
             }
             getImage();
        }

        if(data.poster_path){
            const getImage = async()=>{
                fetch(`${IMG_API}${ORIGINAL}${data.poster_path}`,{
                     method: "GET",
                 }).then((res)=>{
                     if(res.url){
                         setPosterImg(res.url);
                     }
                 });
             }
             getImage();
        }
    },[data])

    useEffect(()=>{
        if(id){
            const fetchVideo = async()=>{
                const res = await fetch(`${MOVIE_API}movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`)
                const resData = await res.json();
                if(resData){
                    resData.videos.results.forEach((val)=>{
                       if(val.type === "Trailer" && val.site === "YouTube"){
                           setVideo(val.key);
                       }
                    });
                    if(resData.credits.cast){
                        setCast(()=>{
                            return [...resData.credits.cast]
                        })
                    }
                }
            }
            fetchVideo();
        }
    },[id])

    const handleAddFav = ()=>{
        dispatch(addFavorite({ 
            movieId: id, 
            movieTitle: data.original_title, 
            releasedYear: data.release_date, 
            duration: data.runtime, 
            url: posterImg
        }));
    }

    useEffect(()=>{
        if(message){
            alert(message);
            dispatch(favoriteActions.removeMessage());
        }
    },[message]);

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch(favoriteActions.removeError());
        }
    },[error])
    
    return (
        <section className={classes.moviedetail_container}>
            <section className={classes.movie_main_detail_container}
                style={{
                    background: `linear-gradient(to bottom, rgb(0,0,0,0) 40%, rgba(255, 255, 255, 0.8) 80%, rgba(255,255,255,1) 100%), url(${backdropImg}) no-repeat top center/cover`,
                }}
            >
                <section className={classes.movie_main_detail_child}>
                    <section className={classes.movie_desc_img}>
                        <div className={classes.movie_desc_img_here}>
                            <img src={posterImg} alt='' />
                        </div>
                    </section>
                    <section className={classes.main_desc_container}>
                        <section className={classes.child}>
                            <section className={classes.side_desc_here}>
                                <section className={classes.header_desc}>
                                    <section className={classes.name_side}>
                                        <header className={classes.movie_title}>
                                            {data.original_title && data.original_title}
                                        </header>
                                        <section className={classes.movie_detail_tags}>
                                            { data.genres && data.genres.map((genre)=>{ return (
                                            <span key={genre.id}>{genre.name && genre.name}</span>)}) }
                                        </section>
                                    </section>
                                    <section className={classes.favorite_btn}>
                                        { (token || tokenL) && 
                                            <button onClick={handleAddFav}>&#xFF0B; Add to Favorite</button> 
                                        }
                                    </section>
                                </section>
                                <article className={classes.bottom_desc}>
                                    <header>Overview</header>
                                    <p>
                                       {data.overview && data.overview}
                                    </p>
                                </article>
                                <section className={classes.detail_info_container}>
                                    <ul>
                                        <li>
                                            <span>Title: </span> {data.title && data.title}
                                        </li>
                                        <li>
                                            <span>Status: </span> {data.status && data.status} {!data.status && "Not released"}
                                        </li>
                                        <li>
                                            <span>Votes: </span> {data.vote_average && data.vote_average} / {data.vote_count && data.vote_count} votes
                                        </li>
                                        <li>
                                            <span>Language: </span> {data.spoken_languages && data.spoken_languages.map((lang)=>{
                                                return(
                                                    <span className={classes.lang_name}>{lang.name}, &nbsp;</span>
                                                )
                                            })}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <span>Duration: </span> {data.runtime && data.runtime} min.
                                        </li>
                                        <li>
                                            <span>Release Date: </span> {data.release_date && data.release_date}
                                        </li>
                                        <li>
                                            <span>Production Company: </span> 
                                            {data.production_companies && data.production_companies.slice(0,1).map(compnay=>{
                                                return(
                                                    <span className={classes.lang_name}>{compnay.name}, &nbsp;</span>
                                                )
                                            })}
                                        </li>
                                        <li>
                                            <span>Popularity: </span> {data.popularity && data.popularity}
                                        </li>
                                    </ul>
                                </section>
                                <section className={classes.trailer_fetch_info}>
                                    <a href={`${IMDB_API}${data.imdb_id && data.imdb_id}`} target={"_blank"} rel={" noopener noreferrer"}>
                                    <button className={classes.trailer_btn}>
                                        IMDB 7.5
                                    </button>
                                    </a>
                                    <a href={`https://www.youtube.com/watch?v=${video}`} target={`_blank`} rel={'noopener referrer'}>
                                    <button className={classes.trailer_btn}>
                                        Watch Trailer
                                    </button>
                                    </a>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>

            <section className={classes.movie_main_cast_container}>
                <header>
                    <div>
                        <span>Casts</span>
                    </div>
                    <div>
                        <button 
                            onClick={()=>setCastInfo(!castInfo)}
                            >
                                { castInfo ? "Hide Cast": "Show Cast" }
                            </button>
                    </div>
                </header>
                { castInfo && 
                <div className={classes.movie_main_cast_child}>
                    { cast.map((item, key)=>{
                        return (
                        <CastCard item={item} posterImg={posterImg} key={key}/> 
                        )
                    }) }
                </div> }

                <Comment id={id} /> 
            </section>
        </section>
    )
}

export default MovieDetail