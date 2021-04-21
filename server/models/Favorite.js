const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    // User Model을 ObjectId 값으로 가져올 수 있도록 설정
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
    // 생성된 시간 등 자동 처리
}, { timestamps: true})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }