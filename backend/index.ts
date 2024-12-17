import express, { Application } from 'express'
import userRoutes from './src/routes/userRoutes'

const app: Application = express()
const port: number = 3000

app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
