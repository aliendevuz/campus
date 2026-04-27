const Subject = require("../models/Subject");

const getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
};

const createSubject = async (req, res) => {
  const subject = await Subject.create(req.body);
  res.status(201).json(subject);
};

module.exports = {
  getSubjects,
  createSubject
};