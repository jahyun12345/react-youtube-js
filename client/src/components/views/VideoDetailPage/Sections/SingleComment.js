import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Input } from 'antd';

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.videoId;

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState('');

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
    ]

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content:CommentValue,
            writer:user.userData._id,
            videoId:videoId,
            responseTo:props.comment._id
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
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} />}
                content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&
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
            }
        </div>

    )
}

export default SingleComment
