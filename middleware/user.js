
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {    
    try {            
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(200).send({ error: 'Please authenticate with admin.' })
    }
}

module.exports = auth