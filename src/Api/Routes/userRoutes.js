const express = require('express');
const userController = require('../Controllers/UserController');
const userRouter = express.Router();

userRouter
    .post('/', userController.createUser)
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserById)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

module.exports = userRouter;







// // Only logged-in users with 'Admin' role or 'Write' permission can create users
// router.post(
//     '/',
//     authMiddleware,
//     authorizationMiddleware(['Admin'], ['Write']),
//     userController.createUser
// );

// // Only logged-in users with 'Read' permission can view all users
// router.get(
//     '/',
//     authMiddleware,
//     authorizationMiddleware([], ['Read']),
//     userController.getAllUsers
// );

// // Only logged-in users with 'Admin' role can delete users
// router.delete(
//     '/:id',
//     authMiddleware,
//     authorizationMiddleware(['Admin']),
//     userController.deleteUser
// );

// module.exports = router;
