import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import crypto from 'node:crypto';
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
    public_id: (req, file) => {
      const uniqueId = crypto.randomBytes(6).toString('hex');
      const originalName = file.originalname
        .split('.')
        .slice(0, -1)
        .join('.')
        .replace(/\s+/g, '-')
        .toLowerCase();

      return `${originalName}-${uniqueId}`;
    },
  },
});

const noteUpload = multer({ storage: noteStorage });

export default noteUpload;
