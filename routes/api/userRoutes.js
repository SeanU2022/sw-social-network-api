const router = require('express').Router();


//  ****************************************
const {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser)

 // /api/users/:userId/friends/:friendId
// const friendRoutes = require('./friendRoutes')
// router.use('/:userId/friends', friendRoutes)
// TO DO create friendRoutes TO replace:

router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend)


module.exports = router;
