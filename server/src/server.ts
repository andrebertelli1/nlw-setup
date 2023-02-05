import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'
import { notificationRoutes } from './notification-routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)
app.register(notificationRoutes)

/**
 * Método HTTP: Get, Post, Put, Patch, Delete
 */

app.listen({
    port: 3333,
    host: '0.0.0.0',
}).then(() => {
    console.log('Server running at http://localhost:3333')
})