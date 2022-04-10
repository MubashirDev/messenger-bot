require('dotenv').config();
const Sequelize = require('./sequelize');
require('./models');
Sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});