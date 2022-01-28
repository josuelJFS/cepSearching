const mysql = require('mysql')
require('dotenv').config()

const HOST = process.env.BD_HOST;
const USER = process.env.BD_USER;
const PASSWORD = process.env.BD_PASSWORD;
const PORT = Number( process.env.BD_PORT || 3306 );
const DATABASE = process.env.BD_DATABASE || 'cepDB';
const TIMEZONE = process.env.TIMEZONE || 'utc';
const CHARSET = process.env.CHARSET || 'utf8';

console.log(HOST,USER,PASSWORD)
const createConnection = () => {
    return mysql.createConnection({
        host:HOST,
        user:USER,
        password:PASSWORD,
        port:PORT,
        database:DATABASE,
        timezone:TIMEZONE,
        charset:CHARSET
    })
}


exports.querySync = (query, data, {}={}) =>
    new Promise((res,rej) => {
        const connection = createConnection()
        connection.connect(error => {
            if(error){
                connection.end()
                return rej(error)
            }
            connection.query(query,data,(error, result) => {
                if(error){
                    connection.end()
                    return rej(error)
                }
                res(result)
                connection.end()
            })
        })
    })