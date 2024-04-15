module.exports = (sequelize, dataTypes) => {

    const alias = 'Appointment';

    const cols = {

        appointment_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        client_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clients',
                key: 'client_id'
            },
        },
        service_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'services',
                key: 'service_id'
            },
        },
        employee_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employess',
                key: 'employee_id'
            },
        },
        duration_minutes: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        notes: {
            type: dataTypes.TEXT,
            collate: 'utf8mb4_general_ci',
            allowNull: true,
        },
        status: {
            type: dataTypes.STRING(50),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
        },
        reminder: {
            type: dataTypes.BOOLEAN,
            allowNull: true,
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW,
            onUpdate: dataTypes.NOW,
            allowNull: false,
        },
        is_paid: {
            type: dataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    };

    const config = {
        tableName: 'appointments',
        timestamps: false,
    };

    const Appointment = sequelize.define(alias, cols, config);

    Appointment.associate = (models) => {

        Appointment.belongsToMany(models.Availability, {
            through: 'AppointmentAvailability',
            foreignKey: 'appointment_id',
            otherKey: 'availability_id',
            as: 'appointmentAvailabilities',
        });
        
        Appointment.hasMany(models.AppointmentAvailability, 
            { 
                foreignKey: 'appointment_id', 
                as: 'appointmentAvailability' 
            });

        Appointment.belongsTo(models.Employee, {
            as: 'appointmentEmployee',
            foreignKey: 'employee_id'
        });

        Appointment.belongsTo(models.Client, {
            as: 'appointmentClient',
            foreignKey: 'client_id'
        });

        Appointment.belongsTo(models.Service, {
            as: 'appointmentService',
            foreignKey: 'service_id'
        });
  
    };


    return Appointment;

};