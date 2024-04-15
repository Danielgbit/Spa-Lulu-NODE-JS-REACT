module.exports = (sequelize, dataTypes) => {

    const alias = 'Employee';

    const cols = {

        employee_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          full_name: {
            type: dataTypes.STRING(200),
            collate: 'utf8mb4_general_ci',
            allowNull: false,
          },
          phone_number: {
            type: dataTypes.STRING(50),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
          email: {
            type: dataTypes.STRING(255),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
          position: {
            type: dataTypes.STRING(100),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
          biography: {
            type: dataTypes.TEXT,
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
    };

    const config = {
        tableName: 'employees',
        timestamps: false,
    }; 
    
    const Employee = sequelize.define(alias, cols, config);

    Employee.associate = (models) => {
      
        Employee.hasMany(models.Appointment, {
            as: 'employeeAppointment',
            foreignKey: 'employee_id'
        });

        Employee.hasMany(models.Availability, {
            as: 'employeeAvailability',
            foreignKey: 'employee_id'
        });

        Employee.hasMany(models.Gain, {
          foreignKey: 'employee_id',
          as: 'employeeGains'
        });
    };

    return Employee; 

};