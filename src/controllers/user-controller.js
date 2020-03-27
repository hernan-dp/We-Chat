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

export const signUp = async (_, { data }, { models }) => {
  const user = await models.user.findOne({ where: { username: data.username } })
  if (!user) {
    const createduser = await models.user.create(data)
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ sub: createduser.id }, secret, { expiresIn: '10d' })
    return {
      user: createduser,
      jwt: token
    }
  } else {
    if (user) throw new Error('Username already in use')
  }
}

export const signIn = async (_, { data }, { models }) => {
  const user = await models.user.findUserByUsername(data.username)
  if (!user) {
    throw new Error('Username or password incorrect')
  }
  const valid = await user.passwordMatches(data.password)
  if (!valid) {
    throw new Error('Username or password incorrect')
  }
  const secret = process.env.JWT_SECRET
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '10d' })
  return {
    user: user,
    jwt: token
  }
}

export const userlogged = (_, id, { user }) => {
  return user
}

export const sendMessage = (_, {input: { sender, channel, text}}, { pubsub }) => {
  const message = { sender, channel, text}
  pubsub.publish(channel, { message })
  return message
}
