module.exports = (sequelize, dataTypes) => {

    const alias = 'Order';

    const cols = {

        order_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_date: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW,
        },
        total_amount: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: dataTypes.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending',
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },

    };

    const config = {
        tableName: 'orders',
        timestamps: false
    };

    const Order = sequelize.define(alias, cols, config);


    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: 'OrderUser',
            foreignKey: 'user_id',
        });

        Order.hasMany(models.OrderDetail, {
            as: 'OrderDetails',
            foreignKey: 'order_id'
        });
    };




    return Order;

};