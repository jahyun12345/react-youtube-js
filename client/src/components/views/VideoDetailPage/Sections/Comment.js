import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.postId;

    const [CommentValue, setCommentValue] = useState('');
    
    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content:CommentValue,
            writer:user.userData._id,
            postId:videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.result);
                    props.refreshFunction(response.data.result);
                    setCommentValue('');
                } else {
                    alert('failed to save comment');
                }
            })
    }

    return (
        <div>
            <br/>
            <p> Replies</p>
            <hr/>

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                // depth-1 댓글만 출력되도록    
               (!comment.responseTo &&
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} key={index} />
                )
            ))}

            {/* Root Comment Form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="write comment"
                />
                <br/>
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>

    )
}

export default Comment
