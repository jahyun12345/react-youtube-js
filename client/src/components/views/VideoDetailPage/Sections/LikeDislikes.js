import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable = {};
    if (props.video) {
        variable = { videoId:props.videoId, userId:props.userId };
    } else {
        variable = { commentId:props.commentId, userId:props.userId };
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 좋아요 수
                    setLikes(response.data.likes.length);
                    // 좋아요 활성화 상태
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked');
                        }
                    })
                } else {
                    alert('failed to load likes info');
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 싫어요 수
                    setDislikes(response.data.dislikes.length);
                    // 싫어요 활성화 상태
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    })
                } else {
                    alert('failed to load dislikes info');
                }
            })
    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');
                        if (DislikeAction !== null) {
                            setDislikes(Dislikes - 1);
                            setDislikeAction(null);
                        }
                    } else {
                        alert('failed to up-like');
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(Likes - 1);
                    setLikeAction(null);
                } else {
                    alert('failed to un-like');
                }
            })
        }
    }

    const onDislike = () => {
        if (DislikeAction === null) {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1);
                        setDislikeAction('disliked');
                        if (LikeAction !== null) {
                            setLikes(Likes - 1);
                            setLikeAction(null);
                        }
                    } else {
                        alert('failed to up-dislike');
                    }
                })
        } else {
            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if (response.data.success) {
                    setDislikes(Dislikes - 1);
                    setDislikeAction(null);
                } else {
                    alert('failed to un-dislike');
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon 
                        type="like" 
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} 
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}> {Likes} </span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon 
                        type="dislike" 
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike} 
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}> {Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
