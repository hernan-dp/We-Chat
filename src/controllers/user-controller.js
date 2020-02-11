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

export const signup = async (_, input, { models }) => {
  const user = await models.user.findOne({ where: { username: input.username }}) 
  if (!user){
    user = await models.user.createUser({ input })
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ sub: user.id }, secret, { exp: '10d' } )
    return {
      token,
      user,
    }
  }
  else {
    throw new Error('Usuario ya existente');
  }
}