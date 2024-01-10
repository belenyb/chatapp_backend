const Message = require('../models/message');

const getChat = async (req, res = response) => {
  const myUid = req.uid;
  const fromUid = req.params.from;

  const messagesWithLimit = await Message.find({
    $or: [{ from: myUid, to: fromUid }, { from: fromUid, to: myUid }]
  })
  .sort({createdAt: 'desc'})
  .limit(30)

  res.json({
    ok: true,
    messages: messagesWithLimit
  })
}

module.exports = {
  getChat
}
