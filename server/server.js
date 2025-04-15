const express = require('express')
const cors = require('cors')

const authorization = require('./routes/authorization')
const userRouter = require('./routes/user')
const blogRouter =  require('./routes/Blog')
const catergoryRouter = require('./routes/category')

const app = express()
app.use(cors())
app.use(express.json())
app.use(authorization)

app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/category', catergoryRouter)

app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000...')
})