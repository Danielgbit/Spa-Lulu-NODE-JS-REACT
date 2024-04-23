const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sharpService = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const image = req.file;

    const bufferSharp = sharp(image.buffer)
    .resize(200, 200, {
        fit: 'cover'
    })
    .jpeg({ quality: 75 })
    .png({ compressionLevel: 6 })
    .withMetadata(false);

    const serviceResult = await bufferSharp.toBuffer();
    
    const imageName = 'service' + '-' + Date.now() + path.extname(req.file.originalname);
    const filePath = path.join(__dirname, '..', '..', 'public', 'imgs', 'services', imageName);

    fs.writeFileSync(filePath, serviceResult);

    req.imageFileName = imageName;

    next();
};

module.exports = sharpService;