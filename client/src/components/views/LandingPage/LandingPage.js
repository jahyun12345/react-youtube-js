import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Typography } from 'antd';
import VideoCards from '../commons/VideoCards';

const { Title } = Typography;

function LandingPage() {
    const [Video, setVideo] = useState([]);

    // DOM load 되자마자 실행 
    // [](=[input]) 부분 없을 시 계속해서 실행
    // [](=[input]) 부분 있는 경우 한 번만 실행
    // class component의 componentDidMount와 같은 역할
    useEffect(() => {
        Axios.get('/api/video/getVideos')
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

export default LandingPage
