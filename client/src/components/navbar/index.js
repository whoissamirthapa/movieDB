import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../reducers/authReducer';

import classes from './navbar.module.css';

const Navbar = () => {

    const dispatch = useDispatch();
    const [navInfo, setNavInfo] = useState(false);

    const token = useSelector(state=>state.auth.token);
    const tokenL = localStorage.getItem("userToken");


    const [userL, setUserL] = useState({
        token: null,
        tokenL: null
    });

    useEffect(()=>{
        if(token || tokenL){
            const info = { token, tokenL}
            setUserL(()=>{
                return { ...info}
            })
        }
    },[token, tokenL])
    const handleLogOut=()=>{
        const info = { token: null, tokenL: null}
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        dispatch(authActions.removeToken());
        setUserL(()=>{
            return {...info}
        })
    }

    return (
        <nav className={classes.navbar}>
            <section className={classes.navbar_container}>
                <div className={classes.navbar_logo_container}>
                    <div className={classes.navbar_logo}>
                       <Link to={'/'}>
                           <span className={classes.logo}>movie<span>DB</span></span>
                        </Link>
                    </div>
                </div>
                <div className={classes.navbar_right}>
                    <div className={classes.login_btn_container}>
                        { (!userL.tokenL) && <Link to={'/login'}>
                        
                        <button className={classes.login_btn}>Login</button>
                        </Link> }
                        { (userL.token || userL.tokenL) && <Link to={'/favorite'}>
                        
                        <button className={classes.login_btn}>Favorite</button>
                        </Link> }
                    </div>
                    <div className={classes.login_btn_container}>
                        { (!userL.tokenL) && <Link to={'/register'}>
                        
                        <button className={classes.register_btn}>Register</button>
                        </Link> }
                        { (userL.token || userL.tokenL) && <Link to={'/'}>
                        
                        <button className={classes.register_btn} onClick={handleLogOut}>Log out</button>
                        </Link> }
                    </div>
                </div>

                <div className={classes.md_nav}>
                    <div className={classes.md_nav_open}>
                        <button onClick={()=>setNavInfo(true)}>
                        &#9776;
                        </button>
                    </div>
                    { 
                    <section className={navInfo ? classes.md_nav_item_show : classes.md_nav_item}>
                        <section className={classes.md_nav_item_child}>
                            <section className={classes.md_top_nav}>
                                <div className={classes.md_title}>
                                    movieApp
                                </div>
                                <div className={classes.md_nav_close}>

                                <button onClick={()=>setNavInfo(false)}>&#10006;</button>
                                </div>
                            </section>
                            <div className={classes.md_login_btn_container}>
                                { (!userL.tokenL) && <Link to={'/login'}>
                            
                                <button className={classes.login_btn}>Login</button>
                                </Link> }
                                { (userL.token || userL.tokenL) && <Link to={'/favorite'}>
                                
                                <button className={classes.login_btn}>Favorite</button>
                                </Link> }
                            </div>
                            <div className={classes.md_login_btn_container}>
                                { (!userL.tokenL) && <Link to={'/register'}>
                                
                                <button className={classes.register_btn}>Register</button>
                                </Link> }
                                { (userL.token || userL.tokenL) && <Link to={'/'}>
                                
                                <button className={classes.register_btn} onClick={handleLogOut}>Log out</button>
                                </Link> }
                            </div>
                        </section>
                    </section> }
                </div>
            </section>
        </nav>
    )
}

export default Navbar