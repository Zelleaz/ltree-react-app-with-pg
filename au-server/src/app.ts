import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from 'koa-cors'
import { StatusCodes } from 'http-status-codes'


import { regionsController } from './modules';

export const app = new Koa() 

app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}))
app.use(bodyParser())
app.use(regionsController.routes())
app.use(regionsController.allowedMethods())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = e.statusCode || e.status || StatusCodes.INTERNAL_SERVER_ERROR
    e.status = ctx.status 
    ctx.body = { e }
    ctx.app.emit('error', e, ctx)
  }
})

app.on('error', console.error)

