import { FastifyPluginAsync } from 'fastify'
import { createPaymentLinkHandler } from './payment.handlers'
import { checkPaymentStatusHandler } from './payment.handlers'

const payment: FastifyPluginAsync = async (server) => {
  // Создание платежной ссылки
  server.post('/create-link', createPaymentLinkHandler)
  
  // Проверка статуса платежа
  server.get('/:transactionId/status', checkPaymentStatusHandler)
  
  // Вебхук от TelegaPay
  server.post('/webhook', async (request, reply) => {
    const { transaction_id, status } = request.body as any
    
    if (status === 'paid') {
      await updateSubscription(transaction_id)
    }
    
    reply.code(200).send('OK')
  })
}

export default payment
