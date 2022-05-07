import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment, getComment } from '../../../actions/commentActions';
import { commentActions } from '../../../reducers/commentReducer';

import classes from './comment.module.css';
import { FaTrashAlt} from 'react-icons/fa';

const commentData = [
    {
        name: "John Doe",
        comment: "Wow, Wonderful movie"
    },
    {
        name: "John Doe",
        comment: "Not so fantastic movie"
    },
    {
        name: "John Doe",
        comment: "fasf lfkaho hflisd haisd hvaidfo difas fhaiod"
    },
    {
        name: "John Doe",
        comment: "hfklasdhf aishdfoia shdfiao shdfoai shdfoia sdfhioa shdfioahef asdiofahsdf ohasiodfh aisodhfaioshdfai sdhfiaos dhfiaoshdfiao sdhfaios dfhaiosd hfaiosd fisdfhasifhaios fhewyfa' fhaosifya ohfiaoshdf aioshf oaishdf as"
    },
    {
        name: "John Doe",
        comment: "Average type of movie yeah?"
    },
    {
        name: "John Doe",
        comment: "haha not a bad movie! LOL"
    },
]

const Comment = ({id}) => {

    const dispatch = useDispatch();
    const message = useSelector(state=>state.comment.message);
    const data = useSelector(state=>state.comment.data);
    const tokenL = localStorage.getItem("userToken");
    
    const [comment, setComment] = useState("");
    const [hereToke, setHereToken] = useState("");
    const [deleteCheckBtn, setDeleteCheckBtn] = useState({});

    useEffect(()=>{
        if(tokenL){
            setHereToken(tokenL);
        }
    },[tokenL])
    const handleComment = (e)=>{
        setComment(e.target.value);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(addComment({ content: comment, movieId: id}));
    }

    useEffect(()=>{
        if(message){
            dispatch(commentActions.removeMessage());
            setComment("");
        }
    },[message]);

    useEffect(()=>{
        if(id){
            dispatch(getComment(id));
        }
    },[id])

    const handleDelete = (commentId)=>{
        dispatch(deleteComment({ movieId: id, commentId}))
    }

    useEffect(()=>{
        
        const userInfo = localStorage.getItem("userInfo")
        const pUserInfo = JSON.parse(userInfo);
        setDeleteCheckBtn(()=>{
            return { ... pUserInfo}
        })
    },[])
    return (
        <section className={classes.comment_container}>
            <section className={classes.comment_container_child}>
                <header>
                    <span>Comment</span>
                </header>
                <section className={classes.main_comment_section}>
                    <header>
                        Share your opinion 😃
                    </header>
                    <section className={classes.comment_form}>
                        <form onSubmit={handleSubmit}>
                            <div className={classes.indv_comment_input}>
                            <input type={"text"} id="comment" value={comment} onChange={handleComment} name='comment' placeholder='Enter your comment' />

                            </div>
                            <div className={classes.indv_comment_btn}>

                            <button disabled={!hereToke}>Comment</button>
                            </div>
                        </form>
                    </section>
                    <section className={classes.comment_here}>
                        { !data && <p>No comment </p>}
                        {
                            
                            data && data.map((comment,key)=>{
                                return (
                                    <section className={classes.comment_here_child} key={key}>
                                        <div className={classes.comment_name}>
                                            <div>
                                            🧑‍🦰 {comment.userName && comment.userName}
                                            </div>
                                            { (comment.userId === deleteCheckBtn._id) &&
                                            <div>
                                            <FaTrashAlt onClick={()=>handleDelete(comment._id)} className={classes.delete_icon} />
                                            </div> }
                                        </div>
                                        <div className={classes.comment_}>{comment.content && comment.content}</div>
                                    </section>
                                )
                            })
                        }
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Comment