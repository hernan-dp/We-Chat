import models from '../models'

export const createUser = ({ input: data }) => {
  return models.user.create({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password
  })
}

export const deleteUser = (userId) => {
  return models.user.destroy({
    where: {
      id: userId
    }
  })
}
