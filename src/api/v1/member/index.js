import { Router } from 'express';
import * as memberController from 'controllers/member.ctrl';
import validator from 'middlewares/validator';
import * as schema from './member.schema';

const memberRouter = Router();

memberRouter.get('/', validator(schema.getMembers), memberController.getMembers);

export default memberRouter;
