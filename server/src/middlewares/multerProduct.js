const multer = require('multer');
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'public', 'imgs', 'products');


const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const newFileName = 'product' + '-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

module.exports = upload;