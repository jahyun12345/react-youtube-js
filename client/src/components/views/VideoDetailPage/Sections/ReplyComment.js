import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Input } from 'antd';
import SingleComment from './SingleComment';

const { TextArea } = Input;

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber ++;
            }
        })
        setChildCommentNumber(commentNumber);
    // [props.commentLists] : commentLists 값이 바뀔 때마다 재실행
    }, [props.commentLists])

    const renderReplyComment = (parentCommentId) => {
        props.commentLists.map((comment, index) => (
            <React.Fragment key={index}>
                {/* depth-2 이상의 댓글만 출력되도록 */}
                {/* 답글이 달린 댓글 혹은 답글의 id에 따라 출력 여부 결정됨 */}
                {comment.responseTo === parentCommentId &&
                    <div style={{width:'80%', marginLeft:'40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={props.videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} videoId={props.videoId}videoId={props.videoId} commentLists={props.commentLists} />
                    </div>
                }
            </React.Fragment>
        ))
    }

    const onHandleClick = () => {
        setOpenReplyComments(!OpenReplyComments);
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p 
                    style={{fontSize:'14px', margin:0, color:'gray'}} 
                    onClick={onHandleClick}
                >
                    View {ChildCommentNumber} more comment(s)
                </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>

    )
}

export default ReplyComment
