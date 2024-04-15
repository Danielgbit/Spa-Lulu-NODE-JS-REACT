module.exports = (sequelize, dataTypes) => {

    const alias = 'TransactionDetail';

    const cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_id: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        amount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        order_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'orders',
                key: 'order_id'
            }
        },
        user_id: {
            type: dataTypes.CHAR(36),
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        net_received_amount: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        method_payment: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        transaction_date: {
            type: dataTypes.DATE,
            allowNull: true
        }
    };

    const config = {
        tableName: 'transaction_details',
        timestamps: false,
        createdAt: 'created_at',
    };

    const TransactionDetail = sequelize.define(alias, cols, config);

    TransactionDetail.associate = (models) => {

        TransactionDetail.belongsTo(models.Order, {
            as: 'transactionOrder',
            foreignKey: 'order_id',
        });

        TransactionDetail.belongsTo(models.User, {
            as: 'transactionUser',
            foreignKey: 'user_id',
        });
    };

    return TransactionDetail;
}