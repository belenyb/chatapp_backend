const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
});

// Cuando llamamos toJSON, filtramos el objeto a devolver
// Quitamos __v, _id y password
// Reemplazamos _id por uid
UserSchema.method('toJSON', function(){
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('User', UserSchema)
