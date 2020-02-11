import jwt from 'jsonwebtoken'

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

export const signIn = async (_, { data }, { models }) => {
  const user = models.user.findUserByUsername(data.username)
  if (user) {
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ sub: user.id }, secret)
    return (
      user,
      token
    )
  } else {
    throw new Error('Username or password incorrect')
  }
}
