require("dotenv").config()
const express=require("express")
const cors=require("cors")
const router=require('./routes/router')
require('./config/connection')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT=3001 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
    
})

pfServer.get('/',(req,res)=>{
    res.status(200).json("resolved")
})