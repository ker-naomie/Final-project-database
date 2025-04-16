const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('telemedicine', 'root', '@Mamajoshua', { 
    host: 'localhost',  
    dialect: 'mysql',   
    logging: false,     
});

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
