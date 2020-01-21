import db from '../../models'

export default{
  
  Query: {
    users: (parent, args,{db}) => db.User.findAll(),
    user: (parent,{id},{db}) => db.user.findByPk(id)
  },
  Mutation:{
    createUser: (parent, { firstname, lastname, username, password }, { db }, info) =>
      db.user.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password
      }),
    deleteUser: (parent, {id}, { db }, info) =>
    db.user.destroy({
      where: {
        id: id
      }
    })
  }
}