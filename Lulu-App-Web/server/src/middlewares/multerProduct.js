const multer = require('multer');
const path = require('path');
const filePathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'products');

// Configuración de almacenamiento para la imagen principal
const storageImagePrimary = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePathImage);
  },
  filename: function (req, file, cb) {
        const id = req.body.categoryId
        const timestamp = Math.floor(Math.random() * 1000000000000);
        const newFileName = 'product-' + 'category-' + id + '-' + timestamp + '-' + Date.now() + '-' + path.basename(file.originalname);
        cb(null, newFileName);
  }
});

// Configuración de almacenamiento para las imágenes adicionales
const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePathImage);
  },
  filename: function (req, file, cb) {
    const id = req.body.categoryId
    const timestamp = Math.floor(Math.random() * 1000000000000);
    const newFileName = 'product-' + 'category-' + id + '-' + timestamp + '-' + Date.now() + '-' + path.basename(file.originalname);
    cb(null, newFileName);
  }
});

// Configurar multer para manejar ambos campos de archivo
const multerUpload = multer({
    storage: storageImagePrimary
  }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 3, storage: storageImages}
  ]);
  
module.exports = multerUpload;
