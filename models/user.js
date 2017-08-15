const salt = require("../helpers/crypto")

'use strict';
// const crypto = require("crypto")

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt : DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (model)=>{
        // let rahasia = model.salt
        let random = salt.random(8)
        // let pass = model.password
        model.password = salt.secret(model.password, random)
        model.salt = random
      }
    }
  })

  return User;
};
