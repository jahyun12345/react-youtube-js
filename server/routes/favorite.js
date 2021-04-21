const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

// body : bodyParser 이용하여 request 받을 수 있도록 함
router.post('/favoriteNumber', (req, res) => {
    // favoriteNumber from mongoDB
    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info) => {
        if (err) return res.status(400).send(err);
        // info : favorite 클릭에 대한 정보(사용자 등)이 수를 알기 위해 들어있으므로 length 사용
        res.status(200).json({success:true, favoriteNumber:info.length});
    })

    // send number data to front
})

// favorite-condition
router.post('/favorited', (req, res) => {
    // favoried from mongoDB
    Favorite.find({"movieId":req.body.movieId, "userFrom":req.body.userFrom})
    .exec((err, info) => {
        if (err) return res.status(400).send(err);
        let result = false;
        if (info.length !== 0) result = true;
        res.status(200).json({success:true, favorited:result});
    })
})

// add item to my-favorite-movie-list
router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    });
})

// remove item from my-favorite-movie-list
router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
    .exec((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success:true, doc})
    })
})

// my-favorite-movie-list
router.post('/getFavoredMovie', (req, res) => {
    Favorite.find({userFrom:req.body.userFrom})
    .exec((err, favorites) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success:true, favorites})
    })
})


module.exports = router;
