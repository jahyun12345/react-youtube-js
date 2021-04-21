const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

// body : bodyParser 이용하여 request 받을 수 있도록 함
router.post('/api/favorite/favoriteNumber', (req, res) => {
    // favoriteNumber from mongoDB
    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info) => {
        if (err) return res.status(400).send(err);
        // info : favorite 클릭에 대한 정보(사용자 등)이 수를 알기 위해 들어있으므로 length 사용
        res.status(200).json({success:true, favoriteNumber:info.length});
    })

    // send number data to front
})

module.exports = router;
