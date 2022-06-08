const multer = require('multer')

const storage = multer.diskStorage({  // เก็บรูปแบบ static
    destination : (req,res,cb) => {

        cb(null, 'public/images')
    },

    filename : (req,file,cb) => {
        // console.log(req);
        // console.log(file.mimetype);
        // cb(null, file.originalname)
        cb(null, '' + new Date().getTime() + "." + file.mimetype.split('/')[1]) // ใช้เวลาเป็นตัวอ้างอิงเก็บ รูป
    }

})

module.exports = multer({storage})