const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
const { category, userId } = req.query;
const query = {};

if (category) query.category = category;
if (userId) query.createdBy = userId;

const questions = await Question.find(query).populate('createdBy', 'username');
res.json(questions);
});

router.post('/', async (req, res) => {
const { text, category, createdBy } = req.body;

const question = new Question({ text, category, createdBy });
await question.save();

res.status(201).json(question);
});

module.exports = router;