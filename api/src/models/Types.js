const { DataTypes } = require('sequelize');

const types= (sequelize) => {

    sequelize.define('types', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        }
        
    }, {
        timestamps: false
    });
    
  };


  module.exports = types;