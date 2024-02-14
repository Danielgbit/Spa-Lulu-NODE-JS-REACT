module.exports = (sequelize, dataTypes) => {

    const alias = 'Availability';

    const cols = {

        availability_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          employee_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Employee',
              key: 'employee_id',
            },
          },
          month: {
            type: dataTypes.INTEGER,
            allowNull: false,
          },
          day: {
            type: dataTypes.INTEGER,
            allowNull: true, // O ajusta según tus necesidades
          },
          start_time: {
            type: dataTypes.TIME,
            allowNull: true, // O ajusta según tus necesidades
          },
          end_time: {
            type: dataTypes.TIME,
            allowNull: true, // O ajusta según tus necesidades
          },
          hour: {
            type: dataTypes.TIME,
            allowNull: true, // O ajusta según tus necesidades
          },
    };

    const config = {
        tableName: 'availability',
        timestamps: false,
    }; 
    
    const Availability = sequelize.define(alias, cols, config);

    Availability.associate = (models) => {
        Availability.belongsTo(models.Employee, {
            as: 'availabilityEmployee',
            foreignKey: 'employee_id'
        });
    };

    return Availability; 

};