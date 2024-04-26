const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://postgres:kaamworks_pass@localhost:5432/kaamworks_db');

module.exports = db

