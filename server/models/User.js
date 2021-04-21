const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// saltRounds : 암호화 비밀번호인 salt가 몇 글자인지
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    mail: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String, 
        maxlength: 50
    },
    // auth 구분 위해
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// User Model 호출하여 save() 메소드 실행 전에 먼저 실행되도록 설정
// arrow function 사용시 this 사용 불가능하므로 function()로 설정
userSchema.pre('save', function(next) {
    var user = this;
    
    // 암호 변경시에만 호출되도록 설정
    if (user.isModified('password')) {
        // salt 생성 => salt 이용하여 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                // index에서 호출되도록 next() 호출
                next()
            });
        });
    // 암호 변경이 아닌 경우에 넘어가도록 설정 
    } else {
        next()
    }
})

// 입력 비밀번호 일치 확인 메소드
// index comparePassword method와 바인딩되어 있으므로 이름 / 대입 변수 수 일치
userSchema.methods.comparePassword = function(plainPassword, cb) {
    var user = this;
    // plainPassword : 암호화된 입력 비밀번호
    // this.password : 암호화된 db에 저장된 비밀번호
    // 암호화 값 비교위해 bcrypt.compare 사용
    bcrypt.compare(plainPassword, user.password, function(err, isMatch) {
        if (err) return cb(err);
        // 두 비밀번호 일치 시 isMatch true 값 반환
        cb(null, isMatch);
    })
}

// 토큰 발행 메소드
userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoekn으로 토큰 생성
    // user._id + 'secretToken' = token : 토큰 값으로 user._id 값 알 수 있음
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

// 토큰으로 사용자 검색
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // token decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // user id로 사용자 찾은 후 cookie token / DB token 일치 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }