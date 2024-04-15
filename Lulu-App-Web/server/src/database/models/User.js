module.exports = (sequelize, dataTypes) => {

    const alias = 'User';

    const cols = {

        user_id: {
            type: dataTypes.UUID,
            primaryKey: true,
            allowNull: false
          },
          first_name: {
            type: dataTypes.STRING,
            allowNull: false
          },
          middle_name: {
            type: dataTypes.STRING,
            allowNull: true
          },
          last_name: {
            type: dataTypes.STRING,
            allowNull: false
          },
          phone_number: {
            type: dataTypes.STRING,
            allowNull: true
          },
          email: {
            type: dataTypes.STRING,
            allowNull: false
          },
          city: {
            type: dataTypes.STRING(50),
            allowNull: true
          },
          password: {
            type: dataTypes.STRING,
            allowNull: false
          },
          avatar: {
            type: dataTypes.STRING,
            allowNull: true
          },
          address: {
            type: dataTypes.STRING(100),
            allowNull: false
          },
          district: {
            type: dataTypes.STRING(100),
            allowNull: true
          }

    };

    const config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate  = (models) => {
      User.belongsTo(models.Cart,{
        as: 'cartUser',
        timestamps: false,
        foreignKey: 'user_id'
      });

      User.hasMany(models.Order, { 
        as: 'UserOrder',
        foreignKey: 'user_id'
      });
    };



    return User; 

};