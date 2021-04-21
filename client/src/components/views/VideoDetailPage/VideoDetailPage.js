import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';

function VideoDetailPage(props) {
    // router에 videoId 값을 파라미터로 갖는다고 설정해서 아래 방법으로 가져올 수 있음
    const videoId = props.match.params.videoId;
    const variable = { videoId:videoId };

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert('failed to load video information');
                }
            })
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                        <List.Item actions>
                            <List.Item.Meta 
                                avatar={<Avatar src={VideoDetail.writer.image} />}  
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/* Comments */}
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    SideVideo
                </Col>
            </Row>
        )
    } else {
        return <div>...loading</div>
    }
}

export default VideoDetailPage
