import WebPush from 'web-push'
import { FastifyInstance } from "fastify";
import { z } from 'zod'

const publicKey = 'BJNM4u8xaBa4hfGTWtCMOMfyWagNaCYiiSf22gClkzeRq1H4ixOh0Uwn0OgQbIk3Vd3Arb-cmdwMuOFZvW9hU2k'
const privateKey = 'IaLdOA-xBO_arAkthZvjQUF-4q_phk26MT_eoSyoEEQ'

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  app.post('/push/register', (request, reply) => {
    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody =  z.object({
      subscription : z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'HELLO DO BACKEND')
    }, 5000)

    return reply.status(201).send()
  })
}