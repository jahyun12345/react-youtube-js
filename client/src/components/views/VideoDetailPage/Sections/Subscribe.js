import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = { userTo:props.userTo };
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('failed to load subscriber number');
                }
            })
        
        let subscribedVariable = { userTo:props.userTo, userFrom:localStorage.getItem('userId') };
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('failed to get data');
                }
            })
    }, [])

    const onSubscribe = () => {

        let subscribedVariable = { userTo:props.userTo, userFrom:localStorage.getItem('userId') };
        // 이미 구독 중 : 구독 취소
        if (Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert('failed to unsubscribe');
                    }
                })

        // 아직 구독 전 : 구독
        } else if (!Subscribed) {
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert('failed to subscribe');
                }
            })
        }
    }

    return (
        <div>
            <button
                style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px',
                        color:'white', padding:'10px 16px', fontWeight:'500',
                        fontSize:'1rem', textTransform:'uppercase', border:'transparent'}}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
