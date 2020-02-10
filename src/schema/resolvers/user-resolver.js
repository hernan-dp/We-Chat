import * as userController from '../../controllers/user-controller'

export default {
  Query: {
    users: userController.findAllUsers,
    user: userController.findUserById
  },

  Mutation: {
    createUser: userController.createUser,
    deleteUser: userController.deleteUser,
    signUp: userController.signUp
  }
}
