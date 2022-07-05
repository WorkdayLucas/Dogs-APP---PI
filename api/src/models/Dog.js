const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.STRING
    },
    vida: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {timestamps: false});

  

};
