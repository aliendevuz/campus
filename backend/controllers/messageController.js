const Message = require("../models/Message");

const getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id },
      { receiver: req.user._id }
    ]
  });

  res.json(messages);
};

const sendMessage = async (req, res) => {
  const message = await Message.create({
    sender: req.user._id,
    receiver: req.body.receiver,
    text: req.body.text
  });

  res.status(201).json(message);
};

module.exports = {
  getMessages,
  sendMessage
};