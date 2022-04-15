const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    minHeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxHeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    minLifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxLifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },{
    timestamps:false
  });
};
