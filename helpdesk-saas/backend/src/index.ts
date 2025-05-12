import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { config } from './config'
import { authRoutes } from './modules/auth/auth.routes'
import { ticketRoutes } from './modules/tickets/ticket.routes'
import { chatRoutes } from './modules/livechat/chat.routes'
import { paymentRoutes } from './modules/payments/payment.routes'
import { db } from './db'
import { setupWebhooks } from './webhooks'

const server = Fastify({ logger: true })

// Регистрация плагинов
await server.register(cors, { origin: '*' })
await server.register(jwt, { secret: config.JWT_SECRET })

// Декоратор для пользователя
server.decorateRequest('user', null)

// Маршруты
server.get('/health', async () => ({ status: 'OK' }))
server.register(authRoutes, { prefix: '/api/auth' })
server.register(ticketRoutes, { prefix: '/api/tickets' })
server.register(chatRoutes, { prefix: '/api/chats' })
server.register(paymentRoutes, { prefix: '/api/payments' })

// Подключение к базе данных
db.connect()

// Настройка вебхуков
setupWebhooks(server)

// Запуск сервера
const start = async () => {
  try {
    await server.listen({ port: config.PORT, host: '0.0.0.0' })
    server.log.info(`Сервер запущен на http://localhost:${config.PORT}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
