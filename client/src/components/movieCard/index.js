import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMG_API, W500 } from '../../config';
import classeshome from '../../containers/Home/home.module.css';
import { noImage } from '../../dummyData';

import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteFav } from '../../actions/favoriteAction';

const MovieCard = ({ id, title, backdrop_path, favorite, vote_average, release_date, urlImg }) => {

    const dispatch = useDispatch();
    const [img, setImg] = useState(null);
    const [imgLoading, setImgLoading] = useState(false);
    
    useEffect(()=>{
        if(backdrop_path){
            setImgLoading(true);
            const getImage = async()=>{
               fetch(`${IMG_API}${W500}${backdrop_path}`,{
                    method: "GET",
                }).then((res)=>{
                    setImg(res.url);
                });
                setImgLoading(false);
            }
            getImage();
        }
    },[backdrop_path])

    const handleDelete = ()=>{
        dispatch(deleteFav(id));
    }

    return (
        <article className={classeshome.indv_movie}>
            { favorite &&
            <header className={classeshome.indv_movie_header}>
                <FaTrashAlt onClick={handleDelete} className={classeshome.delete_icon} />
            </header> }
            <Link to={`/movie/${id && id}`}> 
            <section className={classeshome.indv_movie_child}>
                <header className={classeshome.indv_movie_header}>
                    {imgLoading && <p>image loading...</p>}
                  { !imgLoading && img && <img src={img && img} alt='movie title img' /> }
                  { !img && !urlImg && <img src={noImage} alt="" /> }
                  { !imgLoading && !img && urlImg && <img src={urlImg} alt="" /> }
                </header>
                <section className={classeshome.indv_body}>
                    <div className={classeshome.indv_movie_title}>{title && title}</div>
                    <section className={classeshome.indv_desc}>
                        <div className={classeshome.indv_desc_info}>
                            <span>{release_date && release_date.slice(0,4)}</span> &nbsp;
                            <span>{vote_average && vote_average}votes</span>
                        </div>
                        <div className={classeshome.movie_tag}>
                            <span>Movie</span>
                        </div>
                  </section>
                </section>
            </section>
        </Link>
        </article>
    )
}

export default MovieCard