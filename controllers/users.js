const { response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const offset = Number(req.query.offset) || 0;

  const users = await User
    .find({ _id: { $ne: req.uid } })
    .sort('-isOnline')
    .skip(offset)
    .limit(20)

  return res.json({
    ok: true,
    users: users
  })
}

module.exports = {
  getUsers
}
