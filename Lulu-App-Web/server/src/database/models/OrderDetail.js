const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    const alias = 'OrderDetail';

    const cols = {

        order_detail_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          order_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'orders',
              key: 'order_id',
            },
          },
          product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'products',
              key: 'product_id'
            }
          },
          quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
          price: {
            type: dataTypes.INTEGER(18),
            allowNull: false,
          },

    };

    const config = {
        tableName: 'order_details',
        timestamps: false
    };


    const OrderDetail = sequelize.define(alias, cols, config);


    OrderDetail.associate = (models) => {
        OrderDetail.belongsTo(models.Order, { 
            as: 'OrderDetail',
            foreignKey: 'order_id' 
        });
        OrderDetail.belongsTo(models.Product, {
          as: 'OrderProduct',
          foreignKey: 'product_id'
        });
    };




    return OrderDetail; 

};