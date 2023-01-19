const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('TypeDiet', {
    
    id:{
      type: DataTypes.UUID,  
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING
      // type: DataTypes.ENUM("gluten free",
      // "dairy free",
      // "paleolithic",
      // "lacto ovo vegetarian",
      // "primal",
      // "whole 30",
      // "fodmap friendly",
      // "ketogenic",
      // "pescatarian",
      // "vegan")
    }
    
  },{
    timestamps: false
});
};