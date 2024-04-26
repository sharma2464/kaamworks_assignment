const { DataTypes } = require('sequelize');
const db = require("../db_connection")

const Task = db.define(
  'Task',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
  },
);

// `sequelize.define` also returns the model
console.log(Task === db.models.User); // true

module.exports = Task