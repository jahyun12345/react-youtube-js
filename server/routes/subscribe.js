const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", (req, res) => {
    Subscriber.find({userTo:req.body.userTo})
    .exec((err, subscribe) => {
        if (err) return res.status(400).send(err);
        // 구독자 수를 알기 위해 .length 사용
        return res.status(200).json({success:true, subscribeNumber:subscribe.length});
    })
})

router.post("/subscribed", (req, res) => {
    Subscriber.find({userTo:req.body.userTo, userFrom:req.body.userFrom})
    .exec((err, subscribe) => {
        if (err) return res.status(400).send(err);
        let result = false;
        // uerTo, userFrom 데이터로 찾은 구독 버튼 누른 사용자 수가 0이 아님
        // => 해당 사용자는 구독 버튼을 눌렀으므로 result 값을 true로 변경 
        if (subscribe.length !== 0) {
            result = true;
        }
        res.status(200).json({success:true, subscribed:result});
    })
})

module.exports = router;
