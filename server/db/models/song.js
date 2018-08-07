/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('song', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'song'
  });
};
