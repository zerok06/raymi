import express, { Application } from 'express'
import { urlencoded, json } from 'express'
import userRoutes from './src/routes/userRoutes'
import authRoutes from './src/routes/auth/authRoutes'
import eventRoutes from './src/routes/event/eventRoutes'
import categoryRoutes from './src/routes/category/categoryRoutes'
import tagRoutes from './src/routes/tag/tagRoutes'
import organizationRoute from './src/routes/organization/organizationRoute'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { loadEnvFile } from 'process'

loadEnvFile('.env')

const app: Application = express()
const port = process.env.PORT || 3000

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({ origin: '*' }))
app.use(cookieParser())

app.use('/api', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/', eventRoutes)
app.use('/api/', categoryRoutes)
app.use('/api/', tagRoutes)
app.use('/api/', organizationRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
