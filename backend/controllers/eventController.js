const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const events = await Event.find({ user: req.user._id });
  res.json(events);
};

const createEvent = async (req, res) => {
  const event = await Event.create({
    title: req.body.title,
    date: req.body.date,
    user: req.user._id
  });

  res.status(201).json(event);
};

module.exports = {
  getEvents,
  createEvent
};