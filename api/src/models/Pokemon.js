const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const pokemon = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    hp: {
      type: DataTypes.FLOAT,
    },
    attack: {
      type: DataTypes.FLOAT,
    },
    defense: {
      type: DataTypes.FLOAT,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    img: {
      type: DataTypes.STRING,
    }
  },{
    timestamps: false
  }
  )
};
module.exports = pokemon;
