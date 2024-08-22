const mysql=require('mysql2/promise');
const {ErrorHandler}=require('../utils/errorHandler');
const connection=mysql.createPool({
    port: process.env.sqlPORT,
    host: process.env.sqlHOST,
    user: process.env.sqlUSER,
    password: process.env.sqlPASS,
    database: process.env.sqlDB,
    waitForConnections: true,
    connectionLimit: process.env.connectionLimit,
    queueLimit: 0
})

connection.getConnection((error, connection)=>{
    if(error){
        const internalServerError=ErrorHandler.createError(
            'Internal server error, please try again later',
            500
        );
        console.log(internalServerError.message);
        return;
    }

    if(connection)  connection.release();
});

module.exports=connection;