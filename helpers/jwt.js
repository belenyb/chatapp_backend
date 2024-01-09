const jwt = require('jsonwebtoken');

const createJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        reject('Error in creating JWT')
      } else {
        resolve(token);
      }
    });
  });
}

const checkJWT = (token = "") => {
  try {
    if (token != "") {
      const { uid } = jwt.verify(token, process.env.JWT_KEY);
      return [true, uid];
    } else {
      return [false, null];
    }

  } catch (error) {

    console.log(error);
    return [false, null];

  }
}

module.exports = {
  createJWT,
  checkJWT
}
