const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    // User Model을 ObjectId 값으로 가져올 수 있도록 설정
    // 구독 받는 사람
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 구독 하는 사람
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'    
    }
    // 생성된 시간 등 자동 처리
}, { timestamps: true})

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }