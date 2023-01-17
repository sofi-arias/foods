const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, // para que no se repita con el de la API
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // no permite que esté vacio
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthscore: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    dishtypes: {
      type: DataTypes.STRING
      // type: DataTypes.ARRAY(DataTypes.STRING)
    }   
  },{
    timestamps: false
  });
};
