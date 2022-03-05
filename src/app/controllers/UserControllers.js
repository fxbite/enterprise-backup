const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../../util/validation')
const {ACCESS_TOKEN_SECRET} = require('../../config/variables')
class UserController {

    // [POST] /register
    async registerUser(req, res, next){

        // Validate data before using
        const {error} =  registerValidation(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        // Check if the user is already in the db
        const emailExist = await User.findOne({email: req.body.email})
        if(emailExist) return res.status(400).json({message: 'Email already exists'})

        const userNameExist = await User.findOne({username: req.body.username})
        if(userNameExist) return res.status(400).json({message: 'Username already exists'})

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            fullname: req.body.fullname,
            password: hashedPassword,
            role_id: req.body.roleId,
            department_id: req.body.deprtId
        })

        try {
            const savedUser = newUser.save()
            res.status(200).json(savedUser)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    // [POST /login
    async loginUser(req, res, next){

        // Validate data before using
        const {error} =  loginValidation(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

         // Check if the username is exists
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(400).json({message: 'Username not found'})

        // Check password is correct 
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).json({message: 'Invalid Password'})

        // Create and assign a token 
        const token = jwt.sign({_id: user._id}, ACCESS_TOKEN_SECRET )
        res.status(200).header('auth-token', token).json({
            message: 'Login Successfully',
            'access-token': token
        })
    }

    // [DELETE] /user/:id
    async deleteUser(req, res, next){

        try {
            const user = await User.findById(req.params.id)
            await user.deleteOne()
            res.status(200).json({
                message: 'The user has been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new UserController