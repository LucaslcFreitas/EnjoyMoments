import multer from 'multer'
import { extname, join } from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, '../../images/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + extname(file.originalname))
    },
})

const upload = multer({ storage })

export default upload
