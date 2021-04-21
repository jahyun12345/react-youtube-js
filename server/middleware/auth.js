const { User } = require('../models/User.js');

let auth = (req, res, next) => {
    // 인증 처리
    // 클라이언트 쿠키 토큰 가져옴
    // index.js 파일에 x_auth로 쿠키 값 설정
    let token = req.cookies.x_auth;
    // 토큰 복호화(암호문 평문으로 변환) 후 사용자 찾음
    User.findByToken (token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true});
        
        // token / user 정보 사용할 수 있도록 req에 넣어줌
        req.token = token;
        req.user = user;
        // 다음 행동으로 넘어갈 수 있도록 함
        next();
    })
    //  사용자 있으면 인증 O
    //  사용자 없으면 인증 X
}

module.exports = { auth };