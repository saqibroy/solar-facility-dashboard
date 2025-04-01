import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import { Types } from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { gql } from 'graphql-tag'
import { connectDB } from './db.js'
import resolvers from './resolvers.js'
import { Facility } from './models/Facility.js'
import { PerformanceData } from './models/PerformanceData.js'
import { parseCsv } from './utils/csvParser.js'
import { MyContext } from './context.js'
import { User } from './models/User.js'
import { getUserFromToken, requireAuth } from './utils/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const upload = multer({ dest: 'uploads/' })

await connectDB()

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8'
  })
)

const app = express()
const httpServer = http.createServer(app)

app.use(cors<cors.CorsRequest>())
app.use(express.json())

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({
      models: { Facility, PerformanceData, User },
      user: await getUserFromToken(req)
    })
  })
)

app.post(
  '/upload-performance-data/:facilityId',
  requireAuth,
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const { facilityId } = req.params
      const facility = await Facility.findById(facilityId)

      if (!facility) {
        fs.unlinkSync(req.file.path)
        return res.status(404).json({ error: `Facility with ID ${facilityId} not found` })
      }

      const facilityObjectId = new Types.ObjectId(facilityId)
      const results = await parseCsv(req.file.path, facilityObjectId)

      if (results.length === 0) {
        return res.status(400).json({ error: 'No valid data found in CSV' })
      }

      const savedData = await PerformanceData.insertMany(results)

      res.status(200).json({
        message: 'File processed successfully',
        count: savedData.length,
        data: savedData.map(item => ({
          id: item._id.toString(),
          timestamp: item.timestamp.toISOString(),
          activePower: item.activePower,
          energy: item.energy,
          facilityId: item.facilityId.toString()
        }))
      })
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : 'An unknown error occurred' })
    } finally {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
    }
  }
)

await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
console.log('Server ready at http://localhost:4000/graphql')
console.log(
  'File upload endpoint available at http://localhost:4000/upload-performance-data/:facilityId'
)
