import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.videoId;

    const [CommentValue, setCommentValue] = useState('');
    
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content:CommentValue,
            writer:user.userData._id,
            videoId:videoId
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
                <React.Fragment key={index}>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={props.videoId} />
                    <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} videoId={props.videoId} commentLists={props.commentLists} />
                </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={onHandleChange}
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
