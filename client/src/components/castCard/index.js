import React, { useEffect, useState } from 'react';
import { IMG_API, ORIGINAL } from '../../config';

import classes from '../../containers/MovieDetails/moviedetail.module.css';
import { noImage } from '../../dummyData';
import Loading from '../loading';

const CastCard = ({ item }) => {


    const [profileImg, setProfileImg] = useState("");
    const [imgLoading, setImgLoading] = useState(false);


    useEffect(()=>{
        if(item.profile_path){
            setImgLoading(true);
            const getImage = async()=>{
                fetch(`${IMG_API}${ORIGINAL}${item.profile_path}`,{
                    method: "GET",
                }).then((res)=>{
                    if(res.url && res.url !== null){
                       setProfileImg(res.url);
                    }
                });
                setImgLoading(false)
             }
             getImage();
        }
    },[item.profile_path])
    return (
        <>
        { imgLoading && <Loading />}
        { !imgLoading && 
        <article className={classes.indv_cast}>
            <div className={classes.cast_img}>
                { profileImg && <img src={profileImg} alt='' /> }
                { !profileImg && <img src={noImage} alt="" /> }
                <p className={classes.real_cast_name}>{item.name}</p>
            </div>
            <section className={classes.cast_name_container}>
            <div className={classes.cast_name}>{item.character}</div>

            </section>
        </article> }
        </>
    )
}

export default CastCard