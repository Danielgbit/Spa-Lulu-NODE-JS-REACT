module.exports = (sequelize, dataTypes) => {

    const alias = 'ServiceAvailable';

    const cols = {

        availability_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'services',
              key: 'service_id'
            }
        },
        available_date: {
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
        is_available: {
            type: dataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
          
    };

    const config = {
        tableName: 'availabilities',
        timestamps: false
    };

    const ServiceAvailable = sequelize.define(alias, cols, config);


    ServiceAvailable.associate = (models) => {
      
      ServiceAvailable.belongsTo(models.Service, {
          foreignKey: 'service_id',
          as: 'availabilityService'
      });

      ServiceAvailable.hasMany(models.Reservation, {
          foreignKey: 'availability_id',
          as: 'reservations'
      });
  };



    return ServiceAvailable; 

};