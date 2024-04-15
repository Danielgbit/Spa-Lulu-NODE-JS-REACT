module.exports = (sequelize, dataTypes) => {

    const alias = 'Reservation';

    const cols = {

        reservation_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        service_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'services',
                key: 'service_id'
            }
        },
        availability_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'availabilities',
                key: 'availability_id'
            }
        },
        reservation_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        start_time: {
            type: dataTypes.TIME,
            allowNull: false
        },
        end_time: {
            type: dataTypes.TIME,
            allowNull: false
        },
        number_of_people: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        preferences: {
            type: dataTypes.TEXT,
            allowNull: true,
            collate: 'utf8mb4_general_ci'
        },
          
    };

    const config = {
        tableName: 'reservations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false // Si no necesitas 'updatedAt'
    };

    const Reservation = sequelize.define(alias, cols, config);

    Reservation.associate = (models) => {
        Reservation.belongsTo(models.User, {
        as: 'ReservationUser',
        foreignKey: 'user_id',
      });

      Reservation.belongsTo(models.Service, {
        as: 'serviceByReservation',
        foreignKey: 'service_id',
      });

      Reservation.belongsTo(models.ServiceAvailable, {
        as: 'serviceAvailable',
        foreignKey: 'availability_id',
      });
    }



    return Reservation; 

};