const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

// client에서 입력 된 signup data database에 넣어줌
// sign-up
router.post('/register', (req, res) => {
    // bodyParser로 받아올 수 있음
    const user = new User(req.body)
    // mognoDB method : save()
    user.save((err, userInfo) => {
        // 실패(에러 발생)
        if (err) return res.json({ success:false, err})
        // 성공 : .status(200)
        return res.status(200).json({
            success:true
        })
    })
})

// sign-in
router.post('/login', (req, res) => {
    // 요청된 이메일 데이터베이스에서 찾음(findOne() : mongoDB method)
    User.findOne({ mail:req.body.mail }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: 'false',
                message: '입력한 이메일로 가입된 계정이 없습니다.'
            })
        }
        // 요청된 이메일 데이터베이스에 존재 시 비밀번호 확인
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.json({loginSuccess: 'false', message: '비밀번호가 틀렸습니다.'})
            }
            // 비밀번호 맞으면 토큰 생성
            user.generateToken((err, user) => {
                // .satus(400) : 에러 발생
                if (err) return res.status(400).send(err);
                // 토큰을 쿠키 / 로컬스트리지 / 세션 중 쿠키에 저장
                res.cookie('x_auth', user.token).status(200).json({loginSuccess: 'true', userId:user._id});
            })
        })
    })
})

// auth checking
// callback 전에 auth(middleware) 처리 필요
router.get('/auth', auth, (req, res) => {
    // auth에서 에러 발생 X = Authentication : true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        mail: req.user.mail,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// sign-out
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user.id}, {token: ""}, (err, user) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({success: true});
    })
})

module.exports = router;
