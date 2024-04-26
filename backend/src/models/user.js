const { DataTypes } = require('sequelize');
const sequelize = require('../db_connection');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.beforeCreate(async (user, options) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
});

User.afterFind('afterFind', (user, options) => {
    const without_sensitive = user
    delete without_sensitive.password
    return without_sensitive
});

User.afterCreate('afterCreate', (user, options) => {
    const without_sensitive = user
    delete without_sensitive.password
    return without_sensitive
});

module.exports = User;