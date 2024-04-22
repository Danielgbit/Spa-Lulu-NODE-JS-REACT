const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sharpUser = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const avatar = req.file;
    const bufferSharp = sharp(avatar.buffer)
            .resize(200, 200, {
                fit: 'contain'
            })
            .jpeg({ quality: 75 })
            .png({ compressionLevel: 6 })
            .withMetadata(false);
        
    const avatarResult = await bufferSharp.toBuffer();
    
    const avatarName = 'avatar' + '-' + Date.now() + path.extname(req.file.originalname);
    const filePath = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', avatarName);

    fs.writeFileSync(filePath, avatarResult);

    req.avatarFileName = avatarName;

    next();
};

module.exports = sharpUser;