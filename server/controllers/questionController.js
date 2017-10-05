const mongoose = require('mongoose')
const User = require('../models/User')
const Question = require('../models/Question')
var slug = require('achim-slug')
require('dotenv').config()

function createNew (req, res) {
  Question.create({
    slug: slug(`${req.body.title}`),
    title:  req.body.title,
    question: req.body.question,
    author: req.id,
    answers: [],
    voteup: [],
    votedown: []
  })
  .then(function(questionData) {
    res.send(questionData)
  })
  .catch(function(err) {
    res.send(err)
  })
}

function getAll (req, res) {
  Question.find()
  .populate({
    path: 'answers',
    populate: {
      path: 'creator',
      select: 'username'
    }
  })
  .then(question => res.send(question))
  .catch(err => res.send(err))
}

function getOne (req, res) {
  Question.find({
    slug: req.params.slug
  })
  .then(questions => res.send(questions))
  .catch(err => res.send(err))
}

function editOne (req, res) {
  Question.findById(req.params.id)
  //   _id: req.params.id
  // }, {
  //   title: req.body.title,
  //   content: req.body.content,
  //   slug: slug(`${req.body.title}`)
  // }, {
  //   new: true
  // })
  .then(editedQuestions => {
    if (editedQuestions.author == req.id) {
      editedQuestions.title = req.body.title || editedQuestions.title
      editedQuestions.question = req.body.question || editedQuestions.question

      editedQuestions.save((err, data) => {
        if (err) {
          res.send('Maaf tidak bisa save editan anda')
        }
        res.send({
          message: `Update ${data.title} berhasil`
        })
      })
    } else {
      res.send('Gak bisa ngapus nih')
    }
  })
  .catch(err => res.send(err))
}

function deleteOne (req, res) {
  Question.findByIdAndRemove(req.params.id)
  .then(deletedQuestions => {
    if (deletedQuestions.author == req.id) {
      res.send({message: 'Kedelete'})
    } else {
      res.send('Gak bisa ngapus nih')
    }
  })
  .catch(err => res.send(err))
}

function upvoteQuestion (req, res) {
  Question.findOne({
    slug: req.params.slug
  })
  .then(data => {
    if (data.voteup.indexOf(req.id) === -1) {
      data.voteup.push(req.id)
      data.votedown.splice(req.id, 1)
      data.save(function(err, votedAnswer) {
        if(err) console.log(err)
        else console.log(votedAnswer)
      })
      res.send('Akhirnya ada yang voteup')
    } else if (data.voteup.indexOf(req.id) !== -1) {
      console.log('udah ada yg voteup');
      data.voteup.forEach(function(voter) {
        if (voter == req.id) {
          res.send('Ciee udah milih')
        } else if (voter !== req.id) {
          console.log('Masuk nih ke else')
          data.voteup.push(req.id)
          data.votedown.splice(req.id, 1)
          data.save(function(err, votedAnswer) {
            if(err) console.log(err)
            else console.log(votedAnswer)
          })
        }
      })
      res.send('ah elah kok ke bagian upvote sini sih')
    }
  })
  .catch(err => res.send(err))
}

function downvoteQuestion (req, res) {
  Question.findOne({
    slug: req.params.slug
  })
  .then(data => {
    if (data.votedown.indexOf(req.id) === -1) {
      data.votedown.push(req.id)
      data.voteup.splice(req.id, 1)
      data.save(function(err, votedAnswer) {
        if(err) console.log(err)
        else console.log(votedAnswer)
      })
      res.send('Akhirnya ada yang votedown')
    } else if (data.votedown.indexOf(req.id) !== -1) {
      console.log('udah ada yg voteup');
      data.votedown.forEach(function(voter) {
        if (voter == req.id) {
          res.send('Ciee udah milih')
        } else if (voter !== req.id) {
          console.log('Masuk nih ke else')
          data.votedown.push(req.id)
          data.voteup.splice(req.id, 1)
          data.save(function(err, votedAnswer) {
            if(err) console.log(err)
            else console.log(votedAnswer)
          })
        }
      })
      res.send('ah elah kok ke bagian downvote sini sih')
    }
  })
  .catch(err => res.send(err))
}

module.exports = {
  createNew,
  getAll,
  getOne,
  editOne,
  deleteOne,
  upvoteQuestion,
  downvoteQuestion
}
