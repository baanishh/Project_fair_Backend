const express=require('express')
const userController=require('../controllers/userController')
const projectController=require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router=new express.Router()

//register - post
router.post('/register',userController.registerController)
//login - post
router.post('/login',userController.loginController)

//add project - post
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)
//get home projects
router.get('/home-projects',projectController.getHomeProjectController)
//get user projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectController)
//get all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectController)
//edit project
router.put('/project/:id/edit',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.editProjectController)
//remove project - delete
router.delete('/project/:id/remove',jwtMiddleware,projectController.removeProjectController)
//remove project - delete
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserProfileController)


module.exports=router