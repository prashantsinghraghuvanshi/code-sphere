// connection to postGreSQL using neonDB

const { Client } = require("pg");

const client = new Client({
  connectionString:`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSL_MODE}`
})

client.connect();

module.exports=client;