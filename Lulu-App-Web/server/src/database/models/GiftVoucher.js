module.exports = (sequelize, dataTypes) => {

    const alias = 'GiftVoucher';

    const cols = {

        voucher_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        recipient_name: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: false
        },
        recipient_email: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: true
        },
        message: {
            type: dataTypes.TEXT,
            collate: 'utf8mb4_general_ci',
            allowNull: true
        },
        amount: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        purchase_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        expiration_date: {
            type: dataTypes.DATE,
            allowNull: true
        },
        is_redeemed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        redeemed_date: {
            type: dataTypes.DATE,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }

    };

    const config = {
        tableName: 'gift_vouchers',
        timestamps: true
    };

    const GiftVoucher = sequelize.define(alias, cols, config);


    GiftVoucher.associate = (models) => {
        GiftVoucher.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'voucherUser'
            });
        };



    return GiftVoucher; 

};