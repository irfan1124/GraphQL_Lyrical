/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lyric', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    songId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'song',
        key: 'id'
      }
    }
  }, {
    tableName: 'lyric'
  });
};
