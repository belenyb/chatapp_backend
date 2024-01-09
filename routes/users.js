// path: api/login

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getUsers } = require('../controllers/users');

const router = Router();

router.get('/', validateJWT, getUsers);

module.exports = router;
