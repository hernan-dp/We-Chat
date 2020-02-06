export const createUser = (_, { input }, { models }) => {
  return models.user.create(input)  
}

export const deleteUser = (_, { id }, { models }) => {
  return models.user.destroy({
    where: { id }
  })
}

export const findAllUsers = (obj, args, { models }) => {
  return models.user.findAll()
}

export const findUserById = (_, { id }, { models }) => {
  return models.user.findByPk(id)
}
