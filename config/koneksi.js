const {Sequelize} = require('sequelize');

const database_name = 'transaksi';
const password = '';
const username = 'root';
const host = 'localhost';

const sequelize = new Sequelize (database_name, username, password,{ 
    host : host,
    dialect : 'mysql'
})

// sequelize.authenticate()
// .then(() => console.log('Database connected...'))
// .catch(err => console.log('Error: ' + err));

module.exports = sequelize;