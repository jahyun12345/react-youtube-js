const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             Like
//=================================

// 좋아요 정보
router.post('/getLikes', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable= { videoId:req.body.videoId };
    } else {
        variable = { commentId:req.body.commentId };
    }

    Like.find(variable)
    .exec((err, likes) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({success:true, likes});
    })
})

// 싫어요 정보
router.post('/getDislikes', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable= { videoId:req.body.videoId };
    } else {
        variable = { commentId:req.body.commentId };
    }

    Dislike.find(variable)
    .exec((err, dislikes) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({success:true, dislikes});
    })
})

// 좋아요 활성화
router.post('/upLike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable= { videoId:req.body.videoId, userId:req.body.userId };
    } else {
        variable = { commentId:req.body.commentId, userId:req.body.userId };
    }

    // like collection에 클릭 정보 넣어줌
    const like = new Like(variable);
    like.save((err, likeResult) => {
        if (err) return res.json({success:false, err});
        // dislike 활성화 상태 : dislike 수 1 줄여줌
        Dislike.findOneAndDelete(variable)
        .exec((err, dislikeResult) => {
            if (err) return res.status(400).json({success:false, err});
            res.status(200).json({success:true});
        })

    })
})

// 좋아요 비활성화
router.post('/unLike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable= { videoId:req.body.videoId, userId:req.body.userId };
    } else {
        variable = { commentId:req.body.commentId, userId:req.body.userId };
    }

    Like.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({success:false, err});
        res.status(200).json({success:true});
    })
})

// 싫어요 활성화
router.post('/upDislike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable= { videoId:req.body.videoId, userId:req.body.userId };
    } else {
        variable = { commentId:req.body.commentId, userId:req.body.userId };
    }

    // dislike collection에 클릭 정보 넣어줌
    const dislike = new Dislike(variable);
    dislike.save((err, dislikeResult) => {
        if (err) return res.json({success:false, err});
        // like 활성화 상태 : dislike 수 1 줄여줌
        Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if (err) return res.status(400).json({success:false, err});
            res.status(200).json({success:true});
        })

    })
})

// 싫어요 비활성화
router.post('/unDislike', (req, res) => {
    let variable = {};
    if (req.body.videoId) {
        variable= { videoId:req.body.videoId, userId:req.body.userId };
    } else {
        variable = { commentId:req.body.commentId, userId:req.body.userId };
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({success:false, err});
        res.status(200).json({success:true});
    })
})

module.exports = router;
