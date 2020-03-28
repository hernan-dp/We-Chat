import express from 'express'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { createServer } from 'http'
import models from './models'
import schema from './schema'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

require('dotenv').config()

const port = process.env.PORT || 3001

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  const user = await models.user.findByPk(payload.sub)
  done(null, user)
}))

passport.initialize()

const app = express()

app.use((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      next(err)
    } else {
      req.user = user || null
      next()
    }
  })(req, res, next)
})

const pubsub = new PubSub()

const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req, connection }) => {
    if (connection) {
      return {...connection.context, pubsub, models }
    } else {
      return ({pubsub, models, user: req.user })
    }
  },
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
