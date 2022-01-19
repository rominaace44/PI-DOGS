const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
     name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
     },
     peso:{
      type:DataTypes.STRING,
      allowNull:false 
     },
     
     altura:{
       type:DataTypes.STRING,
      allowNull:false 
     },
     años:{
      type: DataTypes.STRING,
      allowNull: true},
     imagen:{
      type:DataTypes.STRING,
      allowNull:true
     },
    //  temperamento:{
    //   type:DataTypes.STRING,
    //   allowNull:false},
    createdInbs:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultvalue:true
      }
  });
};
