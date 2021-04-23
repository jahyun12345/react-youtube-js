import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Typography } from 'antd';
import VideoCards from '../commons/VideoCards';

const { Title } = Typography;

// 구독자의 다른 영상 확인 가능한 페이지
function SubscriptionPage() {
    const [Video, setVideo] = useState([]);

    useEffect(() => {
        let subscriptionVariable = {
            userFrom:localStorage.getItem('userId')
        };

        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    setVideo(response.data.videos);
                } else {
                    alert('failed to load video data');
                }
            })
    }, [])

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr/>
            <VideoCards videos={Video} />
        </div>
    )
}

export default SubscriptionPage
