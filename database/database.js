const Sequelize = require('sequelize');
const mysql = require("mysql2");

const sequelize=new Sequelize('candystore','root','anshulme96@',
{ host: 'localhost',
dialect: 'mysql'
});

// //testing  connection
// async function testConnection(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
    
// }
// testConnection()

module.exports ={sequelize};