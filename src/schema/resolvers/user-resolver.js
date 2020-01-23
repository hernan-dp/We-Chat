import * as userController from '../../controllers/user-controller'
import models from '../../models'

export default {
  Query: {
    users: (parent, args, { models }) => models.userController.findAll(),
    user: (parent, { id }, { models }) => models.userController.findByPk(id)
  },
  Mutation: {
    createUser: (parent, args) => userController.createUser(args.id),
    deleteUser: (parent, args) => userController.deleteUser(args.id)
  }
}
