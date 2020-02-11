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

export const signUp = async (_, data, { models }) => {
  let user = await models.user.findOne({ where: { username: data.username } })
  if (!user) {
    user = await models.user.createUser({ data })
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ sub: user.id }, secret, { exp: '10d' })
    return {
      token,
      user
    }
  } else {
    if (user) throw new Error('Username already in use')
  }
}
