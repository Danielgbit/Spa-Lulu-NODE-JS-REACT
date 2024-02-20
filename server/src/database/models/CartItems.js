module.exports = (sequelize, dataTypes) => {

    const alias = 'CartItems';

    const cols = {

        item_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'cart',
                key: 'cart_id'
            }
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model:'products',
                key:'product_id'
            }
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }

    };

    const config = {
        tableName: 'cart_items',
        timestamps: false
    };

    const CartItems = sequelize.define(alias, cols, config);


    CartItems.associate = (models) => {
        CartItems.belongsTo(models.Cart, {
            foreignKey: 'cart_id',
            as: 'cart'
        });

        CartItems.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'products'
        });
    };




    return CartItems; 

};