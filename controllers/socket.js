const User = require('../models/user');
const Message = require('../models/message');

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

const saveMessage = async (payload) => {
  /*
    payload: {
      from: '',
      to: '',
      message: ''
    }
  */
  try {
    const message = new Message(payload);
    await message.save();
  } catch (error) {
    console.log(`Error in saveMessage: ${error}`);
    return false;
  }
}

module.exports = {
  userConnected,
  userDisconnected,
  saveMessage
}
