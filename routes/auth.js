// path: api/login

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field_validator');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.post('/signup', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldValidator,
], createUser);

router.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  fieldValidator,
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
