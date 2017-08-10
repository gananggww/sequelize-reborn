'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:{
      type : DataTypes.STRING,
      // allowNull: false,
      validate : {
        isEmail: {msg : "format salah"}
      },
      unique: {msg : "email sama"}
    }
  });
  return Student;
};
