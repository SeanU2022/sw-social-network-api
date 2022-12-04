const router = require('express').Router();


//  ****************************************
const {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
 router.route('/:userId').get(getSingleUser).delete(deleteUser)


module.exports = router;
