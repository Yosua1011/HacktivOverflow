var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController')
var auth = require('../helpers/auth')

/* GET users listing. */
router.get('/', questionController.getAll);
router.get('/:slug', questionController.getOne);
router.post('/post', auth.isLogin, questionController.createNew);
router.put('/:id', auth.isLogin, questionController.editOne);
router.delete('/:id', auth.isLogin, auth.isQuestionAuthorAuth, questionController.deleteOne);
router.put('/:slug/upvote', auth.isLogin, questionController.upvoteQuestion);
router.put('/:slug/downvote', auth.isLogin, questionController.downvoteQuestion);

module.exports = router;
