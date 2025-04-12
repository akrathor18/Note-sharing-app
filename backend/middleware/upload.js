import multer from 'multer';
import { storage } from './cloudinary.js';

const upload = multer({ storage });

export default upload;
