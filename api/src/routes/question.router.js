'use strict';

const express = require('express');
const Question = require('../models/question')

const router = express.Router();

const sentQuestions = [];

router.get('/', (req, res) => {
  Question
    .find({})
    .then((data) => {
      const availableQuestions = data.filter((question) => !sentQuestions.includes(question._id.valueOf()));

      if (!availableQuestions.length) {
        sentQuestions.length = 0;
        return res.send({});
      }
    
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions[randomIndex];
    
      sentQuestions.push(randomQuestion._id);
    
      return res.send(randomQuestion);
    })
    .catch(() => console.log('error'));
})

router.delete('/:id', (req, res) => {
  Question
    .findByIdAndDelete(req.params.id)
    .then((question) => {
      res.send(question)
    })
    .catch(() => console.log('error'));
})

router.post('/', (req, res) => {
  const question = new Question(req.body);
  question
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch(() => console.log('error'));
})

router.patch('/:id', (req, res) => {
  Question
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      response.send(result)
    })
    .catch(() => console.log('error'));
})

module.exports.questionRouter = router;