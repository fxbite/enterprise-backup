const router = require('express').Router()
const ideaController = require('../app/controllers/IdeaControllers')
 
// create a idea
router.post('/create', ideaController.createIdea)

// update a idea
router.put('/update/:id', ideaController.updateIdea)

// delete a idea
router.delete('/delete/:id', ideaController.deleteIdea)

// get a idea
router.get('/one/:id', ideaController.getAIdea)

// get all idea
router.get('/', ideaController.getAllIdea)


module.exports = router