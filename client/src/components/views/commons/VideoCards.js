import React from 'react';
import { Card, Avatar, Col, Row } from 'antd';
import moment from 'moment';

const { Meta } = Card;

function VideoCards(props) {
    let videos = props.videos;

    const renderCards = videos.map((video, index) => {
        // duration 값 초 값이므로 환산 필요
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));
        
        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{position:'relative'}}>
                <a href={`/video/${video._id}`}>
                    <img 
                        style={{width:'100%'}} 
                        src={`http://localhost:5000/${video.thumbnail}`}
                        alt="thumbnail"
                    />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>
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
        <Row gutter={[32, 16]}>
            {renderCards}
        </Row>
    )
}

export default VideoCards
