var express = require('express');
var router = express.Router();
var answerController = require('../controllers/answerController')
var auth = require('../helpers/auth')

/* GET users listing. */
// router.get('/', answerController.getAll);
router.get('/:questionid', answerController.getOneAnswer);
router.post('/:questionid', auth.isLogin, answerController.createNewAnswer);
router.put('/:questionid/upvote', auth.isLogin, answerController.upvoteAnswer);
router.put('/:questionid/downvote', auth.isLogin, answerController.downvoteAnswer);
router.delete('/:questionid', auth.isLogin, auth.isAnswerCreatorAuth, answerController.deleteOneAnswer);

module.exports = router;
