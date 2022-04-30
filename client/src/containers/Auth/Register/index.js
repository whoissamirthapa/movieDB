import React, { useEffect, useState } from 'react'

import { validator } from './validator';
import classes from './register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../reducers/authReducer';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const message = useSelector(state=>state.auth.message);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const [nameInfo, setNameInfo] = useState(false);
    const [emailInfo, setEmailInfo] = useState(false);
    const [passwordInfo, setPasswordInfo] = useState(null);
    const [cpasswordInfo, setCpasswordInfo] = useState(false);
    const [cpassV, setCpassV] = useState(false);

    const onKeyName = (e)=>{
        const novalid = validator(e.target.name, e.target.value);
        if(novalid){
           setNameInfo(true);
           return;
        }
        setNameInfo(false);
    }
    const onKeyEmail = (e)=>{
        const novalid = validator(e.target.name, e.target.value);
        if(novalid){
           setEmailInfo(true);
           return;
        }
        setEmailInfo(false);
    }

    const onKeyPassword = (e)=>{
        const novalid = validator(e.target.name, e.target.value);

        if(novalid){
            setPasswordInfo(novalid);
            return;
        }
        setPasswordInfo(null);
    
    }

    const onKeyCpassword = (e)=>{
        
        if(password !== e.target.value){
            setCpasswordInfo(true);
            setCpassV(false)
            return;
        }
        setCpasswordInfo(false);
        setCpassV(true);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if(
            name.trim() ==="" || 
            email.trim() === "" ||
            password.trim() === "" ||
            cpassword.trim() === ""
        ){
            alert("Input must be valid");
            return; 
        }

        if(password !== cpassword){
            alert("Password must match");
            return;
        }

        dispatch(registerUser({ name, email, password, cpassword}));
    }
    
    useEffect(()=>{
        if(message){
            alert(message);
            navigate('/login')
            dispatch(authActions.removeMessage());
        }
    },[message])
    return (
        <section className={classes.register_container}>
            <section className={classes.register_container_child}>
                <header>
                    Register
                </header>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes.indv_form}>
                        <div className={classes.indv_label}>
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className={classes.indv_input}>
                            <input type={'text'} id="name" value={name} name='name' onKeyDown={onKeyName} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name*' />
                        </div>
                        { nameInfo && <p className={classes.valid_input}>Please enter valid name</p>}
                    </div>
                    <div className={classes.indv_form}>
                        <div className={classes.indv_label}>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className={classes.indv_input}>
                            <input type={'email'} id="email" value={email} name='email' onKeyUp={onKeyEmail} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email*' />
                        </div>
                        { emailInfo && <p className={classes.valid_input}>Please enter valid email address</p>}
                    </div>
                    <div className={classes.indv_form}>
                        <div className={classes.indv_label}>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div className={classes.indv_input}>
                            <input type={'password'} id="password" onKeyUp={onKeyPassword} onChange={(e)=>setPassword(e.target.value)} value={password} name='password' placeholder='Enter your password*' />
                        </div>
                        { passwordInfo && <p className={classes.valid_input}>{passwordInfo}</p>}
                    </div>
                    <div className={classes.indv_form}>
                        <div className={classes.indv_label}>
                            <label htmlFor='cpassword'>Confirm Password</label>
                        </div>
                        <div className={classes.indv_input}>
                            <input type={'password'} id="cpassword" onKeyUp={onKeyCpassword} onChange={(e)=>setCpassword(e.target.value)} value={cpassword} name='cpassword' placeholder='Confirm password*' />
                        </div>
                        { cpasswordInfo && <p className={classes.valid_input}>Password must match</p>}
                        { cpassV && <p className={classes.valid_input}>Password matched</p>}
                    </div>
                    <div className={classes.indv_form}>
                        <button>Submit</button>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default Register