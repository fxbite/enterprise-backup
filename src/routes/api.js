const router = require('express').Router()
const multer = require('multer')
const upload = multer()

//? Controllers
const ideaController = require('../app/controllers/IdeaControllers')
const commentController = require('../app/controllers/CommentControllers')
const roleController = require('../app/controllers/RoleControllers')
const reactController = require('../app/controllers/ReactionControllers')
const submissionController = require('../app/controllers/SubmissionControllers')
const iconController = require('../app/controllers/IconControllers')
const departmentController = require('../app/controllers/DepartmentControllers')
const viewController = require('../app/controllers/ViewControllers')
const categoryController = require('../app/controllers/CategoryControllers')
const fileController = require('../app/controllers/FileControllers')
const userController = require('../app/controllers/UserControllers')
const downloadController = require('../app/controllers/DownloadControllers')
const folderController = require('../app/controllers/FolderControllers')
const renderController = require('../app/controllers/RenderControllers')

//? Session
const {requiredLogin, coordinatorRole, managerRole} = require('../middleware/session')
const {registerSchema, loginSchema} = require('../middleware/validation')
const {validateRequest} = require('../middleware/handlerError')

//* Idea
//~ Server rendering
router.get('/idea-register', renderController.registerIdea)
router.get('/idea-detail/:id', renderController.updateIdea)
router.get('/idea-management', renderController.crudIdea)
router.get('/all-ideas/:id', renderController.showAllIdeas)
router.get('/all-submissions', renderController.showForum)
router.get('/idea/detail', renderController.showDetailIdea)

//~ For API
router.post('/idea/:id/role', requiredLogin, ideaController.createIdea) //? Create a idea
router.patch('/idea/:id', requiredLogin, ideaController.updateIdea)     //? Update a idea
router.delete('/idea/:id', requiredLogin, ideaController.deleteIdea)    //? Delete a idea & delete all views 
router.get('/idea/:id', requiredLogin, ideaController.getAIdea)         //? Get a idea
router.get('/ideas', requiredLogin, ideaController.getAllIdea)          //? Get all ideas by pagination


//* Comment
router.post('/comment', requiredLogin, commentController.createComment)          //? Create a comment
router.patch('/comment/:id', requiredLogin, commentController.updateComment)     //? Update a comment
router.delete('/comment/:id', requiredLogin, commentController.deleteComment)    //? Delete a comment
router.get('/comment/:id', requiredLogin, commentController.showAComment)        //? Get a comment 
router.get('/comments', requiredLogin, commentController.showAllComment)         //? Get all latest comments (comments level1)


//* Submission
//~ Server rendering
//TODO: Add requiredLogin & managerRole 
router.get('/submission-management', renderController.crudSubmission)
router.get('/submission-register', renderController.registerSubmission)
router.get('/submission-update/:id', renderController.updateSubmission)
router.post('/submission', submissionController.createSubmission) 

//~ For API
router.route('/submission/:id')
    .patch(submissionController.updateSubmission)  //? Using with server rending
    .delete(submissionController.deleteSubmission) //? Using with server rending
    .get(submissionController.getASubmission)
router.get('/submissions', submissionController.getAllSubmission)   


//* View
//TODO: Add requiredLogin
router.post('/view', viewController.createNewView)    //? Create a new viewer & count total views & update total_view in Idea Collection


//* File
router.post('/file/:id/idea', requiredLogin, upload.single('document'), fileController.createFile)   //? Upload single file to a specific folder in Google Drive


//* User
//~ Server rendering 
//TODO: Add requiredLogin
router.get('/user-management', renderController.crudUser)
router.get('/user-register', renderController.registerUser)
router.get('/user-update/:id', renderController.updateUser)
router.post('/register', registerSchema, validateRequest, userController.registerUser) 
router.get('/login', userController.showLogin)
router.post('/login/auth', loginSchema, validateRequest, userController.authLogin)
router.post('/logout', userController.logout)

//~ For API
router.route('/user/:id')
    .patch(userController.updateUser)    //? Using with server rending
    .delete(userController.deleteUser)   //? Using with server rending
    .get(userController.getAUser)
router.get('/users', userController.getAllUser) // ~ Test


//* Reaction
router.post('/reaction', requiredLogin, reactController.createReact)
router.patch('/react/:id', requiredLogin, reactController.updateReact)
router.get('/react', requiredLogin, reactController.getAllReact)


//* Category
//~ Server rendering
//TODO: Add requiredLogin & managerRole
router.get('/category-management', renderController.crudCategory)
router.post('/category', categoryController.categoryCreate)         //? Create a category
router.get('/test', renderController.test)

//~ For API
router.route('/category/:id')
    .put(categoryController.categoryUpdate)      //? Update a category
    .delete(categoryController.categoryDelete)   //? Delete a category if category is never used
    .get(categoryController.getACategory)        //? Get a category
router.get('/categories', categoryController.getAllCategory)        //? Get all categories


//* Role
//~ For API
router.post('/role', roleController.createRole)         //? Create a role
    .route('/role/:id')
    .put(roleController.updateRole)      //? Update a role
    .delete(roleController.deleteRole)   //? Delete a role
    .get(roleController.getARole)        //? Get a role
router.get('/roles', roleController.getAllRole)         //? Get all roles


//* Department
//~ Server rendering
//TODO: Add requiredLogin & coordinatorRole
router.get('/department-management', renderController.crudDepartment)
router.post('/department', departmentController.createDepart)          //? Create a department

//~ For API
router.route('/department/:id')
    .put(departmentController.updateDepart)       //? Update a department
    .delete(departmentController.deleteDepart)    //? Delete a department
    .get(departmentController.getADepart)         //? Get a department
router.get('/departments', departmentController.getAllDepart)           //? Get all departments


//* Folder
router.post('/folder', folderController.createFolder)           //?
router.delete('/folder/:id', folderController.deleteFolder)     //? 


//* Icon
router.post('/icon', iconController.createNewIcon)     //? Create a new icon
router.put('/icon/:id', iconController.updateIcon)     //? Update a icon
router.delete('/icon/:id', iconController.deleteIcon)  //? Delete a icon
router.get('/icon/:id', iconController.getAIcon)       //? Get a icon
router.get('/icons', iconController.getAllIcon)        //? Get all icons


//* Download CSV file
router.get('/csv/download', downloadController.csvDownload)  //? Download csv


//* Show report chart
router.get('/report', renderController.chartData) 


module.exports = router