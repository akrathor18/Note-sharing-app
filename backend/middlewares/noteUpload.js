import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const noteStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'notes',
    resource_type: 'raw',
    type: 'upload',
    format: async (req, file) => {
      const ext = file.originalname.split('.').pop();
      return ext;
    },
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const noteUpload = multer({ storage: noteStorage });

export default noteUpload;
