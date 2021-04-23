const port = 5000

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// can not find error occured
// const { User } = require('./models/User');
const { User } = require('./models/User.js');
const { Favorite } = require('./models/Favorite.js');

const config = require('./config/key.js');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth.js');

// application/x-www-urlencoded data 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));
// application/json data 분석해서 가져옴
app.use(bodyParser.json());
// 사용자 토큰 쿠키에 저장하기 위해 사용
app.use(cookieParser());

// mongoDB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    // 에러방지 
    useNewUrlParrser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected!')).catch(err => console.log(err))

// router
// npm run backend로 nodemon으로 실행 시 코드 변화 바로 적용되어 결과 확인 가능
app.get('/', (req, res) => res.send('Hello World! 54321'))

// endpoint 중복 주소 정의하여 router 사용할 수 있도록 함
app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', express.static('subscribe'));
app.use('/uploads', express.static('uploads'));

// axios testing
app.get('/api/hello', (req, res) => {
    res.send('Hello, World');
})

app.listen(port, () => console.log('Example app listening on port' + port + '!'))