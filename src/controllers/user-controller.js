import models from '../models'

export const createUser = ({ input }) => {
  return models.user.create(input)
}

export const deleteUser = (userId) => {
  return models.user.destroy({
    where: {
      id: userId
    }
  })
}

export const findAllUsers = () => {
  return models.user.findAll()
}

export const findUserById = (id) => {
  return models.user.findByPk(id)
}
