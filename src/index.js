import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import models from './models'
import schema from './schema'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from './models/user'

require('dotenv').config()

const port = process.env.PORT || 3001

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, req) => {
  req.user = await User.findByPk(payload.sub)
}))

const app = express()

const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req }) => {
    const user = req.user
    return { user, models }
  }

})

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  )
})
