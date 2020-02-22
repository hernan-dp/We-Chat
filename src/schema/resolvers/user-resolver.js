import * as userController from '../../controllers/user-controller'

export default {
  Query: {
    users: userController.findAllUsers,
    user: userController.findUserById,
    currentUser: userController.userlogged 
  },

  Mutation: {
    createUser: userController.createUser,
    deleteUser: userController.deleteUser,
    signup: userController.signUp,
    signin: userController.signIn
  }
}
