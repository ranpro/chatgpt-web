import express from 'express'
import dotenv from 'dotenv'
import type { MongoError } from 'mongodb'
import mongoose from 'mongoose'
import router from './router/api'

class App {
  public app: express.Application

  public run(port = 3002): any {
    this.bootConfig()
    this.bootDatabase()

    this.app = express()

    this.registerMiddlewares()
    this.registerRoutes()

    this.app.listen(port, () => global.console.log('Server is running on port 3002'))
  }

  private bootConfig(): void {
    dotenv.config()
  }

  private bootDatabase(): void {
    mongoose.connect(process.env.MONGO_URL)
      .then(() => {
        global.console.log('mongo connected')
      })
      .catch((error: MongoError) => {
        global.console.log(error)
        throw error
      })
  }

  private registerMiddlewares(): void {
    this.app.use(express.static('public'))
    this.app.use(express.json())
  }

  private registerRoutes(): void {
    this.app.use('', router)
    this.app.use('/api', router)
  }
}

export default new App()
