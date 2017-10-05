const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"
const Answer = require('../models/Answer')

const isLogin = (req,res,next) => {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(decoded.role)
        if (err) {
            res.send(err)
        } else {
            req.role = decoded.role
            req.id = decoded.id
            next()
        }
    })
}

const isAdmin = (req,res,next) => {
    console.log(req.role)
    if(req.role === 'admin') {
        next()
    } else {
        res.send('kamu bukan admin')
    }
}

const isAnswerCreatorAuth = (req,res,next) => {
    Answer.findOne({
      _id: req.params.questionid
    })
    .then(answer => {
      if (answer.creator == req.id) {
        next()
      } else {
        res.send({message: 'Lu bukan siapa2'})
      }
    })
    .catch(err => res.send(err))
}

module.exports = {
    isLogin,
    isAdmin,
    isAnswerCreatorAuth
}
