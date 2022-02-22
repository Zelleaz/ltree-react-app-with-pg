import { StatusCodes } from 'http-status-codes';
import * as Router from 'koa-router'
import regionsService from './regions-service'


export const regionsController = new Router({
  prefix: '/api/regions'
})

regionsController.get('/', async ctx => {
  try {
    const data = await regionsService.getAllRegions()

    ctx.body = {
      status: 'success',
      data
    }

  } catch (e)   {
    console.error(e)
  }
})

regionsController.get('/:id', async ctx => {
  try {
    const data = await regionsService.getRegionById(ctx.params.id)

    ctx.body = {
      status: 'success',
      data
    }

  } catch (e) {
    console.error(e)
  }
})

regionsController.post('/', async ctx => {
  try {
    
    const data = await regionsService.createRegion(ctx.request.body)

    if (!data) {
      ctx.status = StatusCodes.BAD_REQUEST
      ctx.body = {
        status: 'error',
        message: 'Неправильные аргументы'
      }
    } 

    else {
      ctx.status = StatusCodes.CREATED
      ctx.body = {
        status: 'success',
        data
      }
    }

  } catch (e) {
    console.error(e)
  }
})

regionsController.put('/:id', async ctx => {
  try {
    const data = await regionsService.editRegion({
      ...ctx.request.body,
      id: ctx.params.id      
    })

    if (!data) {
      ctx.status = StatusCodes.BAD_REQUEST
      ctx.body = {
        status: 'error',
        message: 'Неправильные аргументы'
      }
    } 

    else {
      ctx.body = {
        status: 'success',
        data
      }
    }

  } catch (e) {
    console.error(e)
  }
})

regionsController.delete('/:id', async ctx => {
  try {
    const data = await regionsService.deleteRegion(ctx.params.id)

    ctx.body = {
      status: 'success',
      data
    }    
  } catch (e) {
    console.error(e)
  }
})