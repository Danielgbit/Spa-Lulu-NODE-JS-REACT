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
        },
        total_amount: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: dataTypes.STRING(50),
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
        payment_method: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        payment_email: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        phone_number: {
            type: dataTypes.STRING(15),
            allowNull: true
        }

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