const mysql=require('mysql2/promise');
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
        console.log(internalServerError.message);
        return error.message;
    }

    if(connection)  connection.release();
});

module.exports=connection;