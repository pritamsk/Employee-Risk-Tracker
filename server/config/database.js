const {createPool} = require("mysql");

const pool = createPool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB
});

module.exports = pool;