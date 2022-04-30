import React, { useEffect, useState } from 'react'

import classes from '../Register/register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../reducers/authReducer';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const message = useSelector(state=>state.auth.message);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if(
            email.trim() === "" ||
            password.trim() === ""
        ){
            alert("Input must be valid");
            return; 
        }

        dispatch(loginUser({ email, password}));
        console.log({ email, password });
    }

    useEffect(()=>{
        if(message){
            alert(message);
            navigate('/');
            dispatch(authActions.removeMessage());
        }
    },[message])
    return (
        <section className={classes.register_container}>
            <section className={classes.register_container_child}>
                <header>
                    Login
                </header>
                <form onSubmit={onSubmitHandler}>
                    
                    <div className={classes.indv_form}>
                        <div className={classes.indv_label}>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className={classes.indv_input}>
                            <input type={'email'} id="email" value={email} name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' />
                        </div>
                    </div>
                    <div className={classes.indv_form}>
                        <div className={classes.indv_label}>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div className={classes.indv_input}>
                            <input type={'password'} id="password" onChange={(e)=>setPassword(e.target.value)} value={password} name='password' placeholder='Enter your password' />
                        </div>
                    </div>
                    
                    <div className={classes.indv_form}>
                        <button>Submit</button>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default Login