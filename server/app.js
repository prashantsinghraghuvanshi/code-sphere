const createError=require('http-errors');
const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');

dotenv.config({path : path.resolve(__dirname, '.env')});
const app=express();
const port = process.env.SERVER_PORT || 5001;

app.use(bodyParser.json());
app.use(cookieParser());

const userRouter=require('./routes/user.Routes.js');
const authRouter=require('./routes/auth.Routes.js');
const adminRouter=require('./routes/admin.Routes.js');
const postRouter=require('./routes/post.Routes.js');
const dataRouter=require('./routes/data.Routes.js');
const mailRouter=require('./routes/mail.Routes.js')

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/post', postRouter);
app.use('/api/data', dataRouter);
app.use('/api/mail', mailRouter);

app.use(function(req,res,next){
    next(createError(404));
})

require('./config/db.js');

app.listen(port, ()=>{
    console.log(`Server is running at port : ${port}`);
});