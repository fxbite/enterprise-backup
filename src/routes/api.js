const router = require('express').Router()
const multer = require('multer')
const upload = multer()

//? Controllers
const ideaController = require('../app/controllers/IdeaControllers')
const commentController = require('../app/controllers/CommentControllers')
const roleController = require('../app/controllers/RoleControllers')
const reactController = require('../app/controllers/ReactSubmitControllers')
const submissionController = require('../app/controllers/SubmissionControllers')
const reactSubmitController = require('../app/controllers/ReactSubmitControllers')
const departmentController = require('../app/controllers/DepartmentControllers')
const viewController = require('../app/controllers/ViewControllers')
const categoryController = require('../app/controllers/CategoryControllers')
const fileController = require('../app/controllers/FileControllers')
const userController = require('../app/controllers/UserControllers')

//* Idea
router.post('/idea/:id/role', ideaController.createIdea) //? Create a idea
router.patch('/idea/:id', ideaController.updateIdea)     //? Update a idea
router.delete('/idea/:id', ideaController.deleteIdea)    //? Delete a idea & delete all views 
router.get('/idea/:id', ideaController.getAIdea)         //? Get a idea
router.get('/ideas', ideaController.getAllIdea)          //? Get all ideas by pagination


//* Comment
router.post('/comment', commentController.createComment)          //? Create a comment
router.patch('/comment/:id', commentController.updateComment)     //? Update a comment
router.delete('/comment/:id', commentController.deleteComment)    //? Delete a comment
router.get('/comment/:id', commentController.showAComment)        //? Get a comment 
router.get('/comments', commentController.showAllComment)         //? Get all latest comments (comments level1)


//* Submission
router.post('/submission', submissionController.createSubmission)        //? Create a topic
router.patch('/submission/:id', submissionController.updateSubmission)   //? Update a topic
router.delete('/submission/:id', submissionController.deleteSubmission)  //? Delete a topic
router.get('/submission/:id', submissionController.getASubmission)       //? Get a topic
router.get('/submissions', submissionController.getAllSubmission)        //? Get all topics


//* View
router.post('/view', viewController.createNewView)    //? Create a new viewer & count total views & update total_view in Idea Collection


//* File
router.post('/file/:id', upload.single('document'), fileController.createFile)   //? Upload single file to a specific folder in Google Drive


//* User
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)


//* Reaction


//* Category
router.post('/category', categoryController.categoryCreate)         //? Create a category
router.put('/category/:id', categoryController.categoryUpdate)      //? Update a category
router.delete('/category/:id', categoryController.categoryDelete)   //? Delete a category if category is never used
router.get('/category/:id', categoryController.getACategory)        //? Get a category
router.get('/categories', categoryController.getAllCategory)        //? Get all categories


//* Role
router.post('/role', roleController.createRole)         //? Create a role
router.put('/role/:id', roleController.updateRole)      //? Update a role
router.delete('/role/:id', roleController.deleteRole)   //? Delete a role
router.get('/role/:id', roleController.getARole)        //? Get a role
router.get('/roles', roleController.getAllRole)         //? Get all roles


//* Department
router.post('/department', departmentController.createDepart)          //? Create a department
router.put('/department/:id', departmentController.updateDepart)       //? Update a department
router.delete('/department/:id', departmentController.deleteDepart)    //? Delete a department
router.get('/department/:id', departmentController.getADepart)         //? Get a department
router.get('departments', departmentController.getAllDepart)           //? Get all departments


//* Reaction Submit
router.post('/react-submit', reactSubmitController.createNewReact)     //? Create a new reaction
router.put('/react-submit/:id', reactSubmitController.updateReact)     //? Update a reaction
router.delete('/react-submit/:id', reactSubmitController.deleteReact)  //? Delete a reaction
router.get('/react-submit/:id', reactSubmitController.getAReact)       //? Get a reaction
router.get('/react-submits', reactSubmitController.getAllReact)        //? Get all reaction


module.exports = router