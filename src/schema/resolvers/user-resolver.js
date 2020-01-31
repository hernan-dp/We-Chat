import * as userController from '../../controllers/user-controller'

export default {
  Query: {
    users: (parent, args) => userController.findAllUsers(),
    user: (parent, { id }) => userController.findUserById(id)
  },
  Mutation: {
    createUser: (parent, args) => userController.createUser(args),
    deleteUser: (parent, id) => userController.deleteUser(id)
  }
}
