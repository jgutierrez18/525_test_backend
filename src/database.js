const mysql = require('mysql'); 
const { promisify } = require('util'); 
const { database } = require('./keys');

const pool = mysql.createPool(database); 

pool.getConnection((err, connection) => {
    if(err){
        if( err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABSE - CONEXION PERDIDA');
        }
        if( err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABSE - TIENE MUCHAS CONEXIONES');
        }
        if( err.code === 'ECONNREFUSED'){
            console.error('DATABSE - CONEXION RECHAZADA');
        }
    }
    if(connection) connection.release(); 
    console.log('MySql - db Conectada');
    return; 

});

pool.query = promisify(pool.query);

module.exports = pool;