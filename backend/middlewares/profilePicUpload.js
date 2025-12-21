import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_profiles',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  }
});


const profilePicUpload = multer({ storage: profileStorage });

export default profilePicUpload;
