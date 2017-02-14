import {Router} from 'express';
import HomeworkController from '../../controller/homework-controll';


const router = Router();
const homeworkCtrl = new HomeworkController();

router.get('/', homeworkCtrl.getAll);

export default router;