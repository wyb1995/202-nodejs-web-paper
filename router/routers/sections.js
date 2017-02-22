import {Router} from 'express';
const SectionControll = require('../../controller/section-controll');

const router = Router();
const sectionCtrl = new SectionControll();

router.get('/', sectionCtrl.getAll);
router.get('/:sectionId', sectionCtrl.getOne);
router.post('/', sectionCtrl.create);
router.put('/:sectionId', sectionCtrl.update);
router.delete('/:sectionId', sectionCtrl.delete);

module.exports = router;