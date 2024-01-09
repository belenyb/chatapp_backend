const User = require('../models/user');

const userConnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.isOnline = true;
  await user.save();
  return user;
}

const userDisconnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.isOnline = false;
  await user.save();
  return user;
}

module.exports = {
  userConnected,
  userDisconnected
}
