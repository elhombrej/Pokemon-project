const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('type', 
    {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
  
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    
    {
      timestamps: false,//evita que muestre el tiempo u hora de modificacion
      freezeTableName: false //evita que sequelize le cambie el nombre
    },
  
    );
};