const mongoose=require('mongoose')

const connection_string=process.env.CONNECTIONSTRING

mongoose.connect(connection_string).then(res=>{
    console.log("connection successful");
}).catch(err=>{
    console.log("connection failure");
    console.log(err);
})