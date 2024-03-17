const express = require("express")
const app = express()
const dotenv = require('dotenv')
const chats = require('./data/data')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
dotenv.config()
const PORT = process.env.PORT || 5000
connectDB()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('hello')
    console.log('hello user');
})

app.use('/api/user',userRoutes)

app.use('/api/chat',chatRoutes)


// app.get('/api/chat/',(req,res)=>{
//     console.log(chats);
//     res.send(chats)
    
// })

// app.get('/api/chat/:id',(req,res)=>{
//     console.log(req.params.id);
//     const singleChat = chats.find((c)=> c._id === req.params.id)
//     res.send(singleChat)
    
// })

app.use(notFound)
app.use(errorHandler)



app.listen(PORT,console.log(`Listening ${PORT}`))