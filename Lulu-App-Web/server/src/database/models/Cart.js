module.exports = (sequelize, dataTypes) => {

    const alias = 'Cart';

    const cols = {

        cart_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references:{
                model:'users',
                key:'user_id'
            }
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }

    };

    const config = {
        tableName: 'cart',
        timestamps: false,
    }; 
    
    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'cartUser'
        });

        Cart.hasMany(models.CartItems, {
            foreignKey: 'cart_id',
            as: 'cartItems'
        });
    };




    return Cart; 

};