'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here

      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  User.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    name: {
      type: DataTypes.STRING, allowNull: false, validate: {
        notNull: { msg: "User Must Have a name" },
        notEmpty: { msg: "Can not be empty" },
      }
    },
    email: {
      type: DataTypes.STRING, allowNull: false, validate: {
        notNull: { msg: "User Must Have a email" },
        notEmpty: { msg: "Can not be empty" },
        isEmail: { msg: "Not a valid email" }
      }
    },
    role: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};