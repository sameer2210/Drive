const express = require('express');
const router = express.Router();

const upload = require('../helper/upload')

router.get('/profile', (req,res) => {
    res.render('profile');
});

router.post('/upload', upload.single('file'), (req,res) => {
    res.send(req.file)
});

module.exports = router;