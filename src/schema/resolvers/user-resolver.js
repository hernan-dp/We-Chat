import * as userController from '../../controllers/user-controller'

export default {
  Query: {
    users: () => userController.findAllUsers(),
    user: ({ id }) => userController.findUserById(id)
  },

  Mutation: {
    createUser: (args) => userController.createUser(args),
    deleteUser: (id) => userController.deleteUser(id)
  }
}
