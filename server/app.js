const createError=require('http-errors');
const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');

dotenv.config({path : path.resolve(__dirname, '.env')});
const app=express();
const port = process.env.SERVER_PORT || 5001;

app.use(bodyParser.json());

const userRouter=require('./routes/userRoute.js');

app.use('/api/user', userRouter);

app.use(function(req,res,next){
    next(createError(404));
})

require('./config/db.js');
app.listen(port, ()=>{
    console.log(`Server is running at port : ${port}`);
});