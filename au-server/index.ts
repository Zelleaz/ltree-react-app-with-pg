import { app } from './src'

const PORT = Number(process.env.PORT) || 4000

app.listen(PORT)
console.log(`Server started on port: ${PORT}`)