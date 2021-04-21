import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

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

    const renderCards = Video.map((video, index) => {
        // duration 값 초 값이므로 환산 필요
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));
        
        return <Col lg={6} md={8} xs={24}>
            <a href={`/video/post/${video._id}`}>
                <div style={{position:'relative'}}>
                    <img 
                        style={{width:'100%'}} 
                        src={`http://localhost:5000/${video.thumbnail}`}
                    />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>
            <br/>
            <Meta 
                avatar={<Avatar src={video.writer.image} />} 
                title={video.title} 
                description="" 
            />
            <span>{video.writer.name}</span>
            <br/>
            <span style={{marginLefT:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
