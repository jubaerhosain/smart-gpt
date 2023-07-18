import { Router } from 'express';
import { getGPTResponse, getGPTResponseByFile } from '../controllers/gptController.js';
import multer from 'multer';
import { createPdf } from '../controllers/pdfGenerationController.js';
import { createBook, getBook, getBookById } from '../controllers/bookController.js';
import express from 'express';

const app = express();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));
//const upload = multer({ dest: 'uploads/' });
const router = Router();

// Define your routes using the router instance
router.post('/',getGPTResponse);
router.post('/file',upload.single('file'), getGPTResponseByFile);


//pdf routers
router.post('/pdf',createPdf);

//bookRouters
router.post('/book',upload.single('file'), createBook);
router.get('/book',getBook);
router.get('/book/:id',getBookById);

export default router;