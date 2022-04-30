import React from 'react'
import classes from './loading.module.css';

const Loading = () => {
    return (
        <section className={classes.loading_}>
        <div className={classes.loading_container}>
            <div className={classes.spin} id={classes.loader}></div>
            <div className={classes.spin} id={classes.loader2}></div>
            <div className={classes.spin} id={classes.loader3}></div>
            <div className={classes.spin} id={classes.loader4}></div>
            <span id={classes.text}>LOADING...</span>
        </div>

        </section>
    
    )
}

export default Loading