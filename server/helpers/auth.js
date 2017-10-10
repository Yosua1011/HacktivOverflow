const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"
const Answer = require('../models/Answer')
const Question = require('../models/Question')

const isLogin = (req,res,next) => {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.send(err)
        } else {
            req.headers = decoded
            next()
        }
    })
}

const isAdmin = (req,res,next) => {
    console.log(req.role)
    if(req.headers.role === 'admin') {
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
      if (answer.creator == req.headers.username) {
        next()
      } else {
        res.send({message: 'Lu bukan siapa2'})
      }
    })
    .catch(err => res.send(err))
}

const isQuestionAuthorAuth = (req,res,next) => {
    Question.find({
      _id: req.params.id
    })
    .then(question => {
      console.log(req.headers.username)
      console.log(question)
      if (question[0].author == req.headers.username) {
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
    isAnswerCreatorAuth,
    isQuestionAuthorAuth
}
