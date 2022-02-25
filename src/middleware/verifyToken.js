const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET} = require('../config/variables')

module.exports = function(req, res, next){
    const token = req.header('auth-token')
    
    if(!token) return res.status(401).json({message: 'Access Denied'})

    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET )
        req.user = verified
        next()

    } catch (error) {
        res.status(400).json({message: 'Invalid Token'})
    }
}