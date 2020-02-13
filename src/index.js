import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import models from './models'
import schema from './schema'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

require('dotenv').config()

const port = process.env.PORT || 3001

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
passport.use(new Strategy(opts, function (JWT_PAYLOAD, done) {
  models.user.findOne({ id: JWT_PAYLOAD.SUB }, function (err, user) {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}))

const app = express()

const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: {
    models
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
