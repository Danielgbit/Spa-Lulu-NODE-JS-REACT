module.exports = (sequelize, dataTypes) => {

    const alias = 'OrderDetail';

    const cols = {

        detail_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          order_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'orders', // Nombre de la tabla referenciada
              key: 'order_id', // Nombre de la clave primaria referenciada
            },
          },
          product_name: {
            type: dataTypes.STRING(255),
            allowNull: false,
          },
          quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
          price: {
            type: dataTypes.DECIMAL(10, 2),
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
    };




    return OrderDetail; 

};