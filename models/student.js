'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    full_name: DataTypes.STRING,
    StudentSubjectId : DataTypes.INTEGER,
    email:{
      type : DataTypes.STRING,
      // allowNull: false,
      validate : {
        isEmail: {msg : "format salah"}
      },
      unique: {msg : "email sama"}
    }
  });

Student.associate = (models) => {
  Student.hasMany(models.StudentSubject)
  Student.belongsToMany(models.Subject, {
    through:"StudentSubject"
  })
}

  return Student;
};
