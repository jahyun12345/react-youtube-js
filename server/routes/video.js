const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
// const { auth } = require("../middleware/auth");
const multer = require("multer");

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

module.exports = router;
