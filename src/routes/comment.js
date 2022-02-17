const router = require('express').Router()
const commentController = require('../app/controllers/CommentControllers')

// create a comment
router.post('/create', commentController.createComment)

// update a comment
router.put('/update/:id', commentController.updateComment)

// delete a comment
router.delete('/delete/:id', commentController.deleteComment)

// get all latest comments (comment level1)
router.get('/all', commentController.showAllComment)

// get a comment
router.get('/one/:id', commentController.showAComment)

module.exports = router