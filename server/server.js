const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const express = require('express')
const authRoute = require('./routes/auth')
const verificationCode = require('./routes/verificationCode')
const noteRoute = require('./routes/note')
const userRoute = require('./routes/user')
const app = express()

app.use(express.json())
app.use(cors());


app.use('/auth',authRoute)
app.use('/note',noteRoute)
app.use('/user',userRoute)
app.use('/verificationCode', verificationCode)



// connect to mongo db
mongoose.connect(process.env.DB_CONNECT_URL,{
})
    .then(() => {
        app.listen(8888, () => {
            console.log('connected to mongoDB')
        })
    })
    .catch((err) => {
        console.log(err)
    })


