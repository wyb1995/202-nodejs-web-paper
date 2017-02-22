const {Router} = require('express');
const PaperControll = require('../../controller/paper-controll');
const router = Router();
const paperCtrl = new PaperControll();

router.get('/', paperCtrl.getAll);
router.get('/:paperId', paperCtrl.getOne);
router.post('/', paperCtrl.create);
router.put('/:paperId', paperCtrl.update);
router.delete('/:paperId', paperCtrl.delete);

module.exports = router;