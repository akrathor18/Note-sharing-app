import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import * as LinkController from '../controllers/links.controller.js';

const router = express.Router();

router.post('/', VerifyJwtMiddleware, LinkController.createLink);
router.get('/me', VerifyJwtMiddleware, LinkController.getMyLinks);
router.put('/bulk', VerifyJwtMiddleware, LinkController.bulkUpdateLinks);
router.patch('/:id', VerifyJwtMiddleware, LinkController.updateLink);
router.delete('/:id', VerifyJwtMiddleware, LinkController.deleteLink);

export default router;