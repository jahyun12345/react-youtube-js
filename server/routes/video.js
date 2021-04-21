const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
// const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

// config option
let storage = multer.diskStorage({
    // destination : file upload 후 저장 위치 설정
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    // filename : 저장시 파일 이름 설정
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    // fileFilter : 파일 형식 등에 따라 저장 가능 파일 필터링 설정
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== 'mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

// 파일 하나만 가져올 수 있도록 설정 : .single('"file")
const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

// 영상 업로드
router.post('/uploadfiles', (req, res) => {
    // video : client => server
    upload(req, res, err => {
        if (err) {
            return res.json({success:false, err});
        }
        // url : 파일 저장될 경로
        return res.json({success:true, url: res.req.file.path, fileName:res.req.file.filename});
    })
})

// 썸네일 생성
router.post('/thumbnail', (req, res) => {
    let filePath = "";
    let fileDuration = "";

    // 비디오 정보(러닝타임 등) 가져옴
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });


    // 썸네일 생성
    // req.body.url : video 저장 경로(uploads)
    ffmpeg(req.body.url)
    // video thumbnail 파일 이름 생성
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '));
        console.log(filenames);
        
        filePath = "uploads/thumbnails/" + filenames[0];
    })
    // thumbnail 생성 후 처리
    .on('end', function () {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration});
    })
    // 에러 처리
    .on('error', function (err) {
        console.error(err);
        return res.json({ success: false, err});
    })
    // thumbnail option
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        // %b : input basename(filename w/o extension) : 확장자명 제외한 파일명
        filename: 'thumbnail-%b.png'
    });
})

module.exports = router;
