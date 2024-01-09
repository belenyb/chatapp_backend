const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email registered in database"
      })
    }

    const user = new User(req.body);

    // Encriptar clave
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await createJWT(user.id);

    return res.json({
      ok: true,
      user: user,
      token
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error in server'
    })

  }

};

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Wrong credentials'
      })
    }

    const isPasswordValid = bcrypt.compareSync(password, userDB.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong credentials'
      })
    }

    const token = await createJWT(userDB.id);
    console.log(`Valid token: ${token}`);

    return res.json({
      ok: true,
      user: userDB,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await createJWT(uid);
  const userDB = await User.findById(uid);
  res.json({
    ok: true,
    user: userDB,
    token
  });
}

module.exports = { createUser, login, renewToken }
