const express = require('express')
const cors = require('cors')
const clientRouter = require('./routes/client.routes')
const requestRouter = require('./routes/request.routes')
const serviceRouter = require('./routes/service.routes')

const PORT = 3001;

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', clientRouter)
app.use('/', requestRouter)
app.use('/', serviceRouter)

app.listen(PORT, () => console.log('Server started on port ' + PORT))