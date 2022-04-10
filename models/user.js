const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const User =  sequelize.define('user', {
    id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: 'email'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'user',
    timestamps: true,
});
module.exports = User;
