import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const UpdateFormAppointment = ({
  appointmentDetail,
  errors,
  employees,
  services,
  clients,
  updateAppointment,
}) => {

  const { register, formState: { errors: err }, handleSubmit, control, setValue} = useForm();
  const [ startTime, setStartTime ] = useState();
  const [ endTime, setEndTime ] = useState();

  const timeStartTime = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
  const defaultStartTime = dayjs(timeStartTime);

  
  const timeEndTime = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
  const defaultEndTime= dayjs(timeEndTime);


  useEffect(() => {
    setStartTime(appointmentDetail?.availabilityAppointments?.startTime);
    setEndTime(appointmentDetail?.availabilityAppointments?.endTime);

    setValue('clientId', appointmentDetail?.availabilityAppointments?.clientId || "");
    setValue('serviceId', appointmentDetail?.availabilityAppointments?.serviceId || "");
    setValue('employeeId', appointmentDetail?.availabilityAppointments?.employeeId || "");
    setValue('notes', appointmentDetail?.availabilityAppointments?.notes || "");
    setValue('status', appointmentDetail?.availabilityAppointments?.status || "");
    setValue('reminder', appointmentDetail?.availabilityAppointments?.reminder === true ? "1" : 0);
    setValue('isPaid', appointmentDetail?.availabilityAppointments?.isPaid === true ? "1" : 0 );

    setValue('startTime', defaultStartTime);
    setValue('endTime', defaultEndTime);

  }, [appointmentDetail]);


  const handleOnSubmit = (data) => {
    updateAppointment({ ...data, startTime: data.startTime.$d, endTime: data.endTime.$d, });
  };

  return (
    <div className="reusable-form-body">
      <h1 className="reusable-form-title">Actualización de cita</h1>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="reusable-form-container"
      >
        <div className="reusable-crud-form-text-input-wrapper">
          <select
            className="textInput"
            name="clientId"
            {...register("clientId", { required: true })}
          >
            <option value="">Selecciona un cliente</option>
            {clients &&
              clients.map((client) => (
                <option key={client.clientId} value={client.clientId}>
                  {client.fullName}{" "}
                </option>
              ))}
          </select>
        </div>
        {errors?.map(
          (e) => e.clientId && <p className="message-error">{e.clientId}</p>
        )}
        {err.clientId?.type === "required" && (
          <p className="message-error">Debes seleccionar un cliente</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <select
            className="textInput"
            name="employeeId"
            {...register("employeeId", { required: true })}
          >
            <option value="">Selecciona un empleado</option>
            {employees &&
              employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.fullName}
                </option>
              ))}
          </select>
        </div>
        {errors?.map(
          (e) => e.employeeId && <p className="message-error">{e.employeeId}</p>
        )}
        {err.employeeId?.type === "required" && (
          <p className="message-error">Debes seleccionar un empleado</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <select
            className="textInput"
            name="serviceId"
            {...register("serviceId", { required: true })}
          >
            <option value="">Selecciona un servicio</option>
            {services &&
              services.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </option>
              ))}
          </select>
        </div>
        {errors?.map(
          (e) => e.serviceId && <p className="message-error">{e.serviceId}</p>
        )}
        {err.serviceId?.type === "required" && (
          <p className="message-error">Debes seleccionar un servicio</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <textarea
            placeholder="Ingresa una nota"
            className="input-textArea"
            name="notes"
            {...register("notes", { maxLength: 50 })}
          ></textarea>
        </div>
        {errors?.map(
          (e) => e.notes && <p className="message-error">{e.notes}</p>
        )}
        {err.notes?.type === "maxLength" && (
          <p className="message-error">Solo se permiten 50 caracteres</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <select
            className="textInput"
            name="status"
            {...register("status", { maxLength: 12, required: true })}
          >
            <option value="">Ingresa un estado</option>
            <option value="No recordar">pendiente</option>
            <option value="proceso">proceso</option>
            <option value="finalizado">finalizado</option>
          </select>
        </div>
        {errors?.map(
          (e) => e.status && <p className="message-error">{e.status}</p>
        )}
        {err.status?.type === "maxLength" && (
          <p className="message-error">
            Debes ingresar los campos suministrados
          </p>
        )}
        {err.status?.type === "required" && (
          <p className="message-error">Debes ingresar un estado</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <select
            className="textInput"
            name="isPaid"
            {...register("isPaid", { maxLength: 10, required: true })}
          >
            <option value="">Ingresa el estado de pago</option>
            <option value="1">Pagado</option>
            <option value="0">Pendiente</option>
          </select>
        </div>
        {errors?.map(
          (e) => e.isPaid && <p className="message-error">{e.isPaid}</p>
        )}
        {err.isPaid?.type === "maxLength" && (
          <p className="message-error">
            Debes ingresar los campos suministrados
          </p>
        )}
        {err.isPaid?.type === "required" && (
          <p className="message-error">Debes ingresar un estado de pago</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <select
            className="textInput"
            name="reminder"
            {...register("reminder", { maxLength: 2 })}
          >
            <option value="">¿Deseas recordar?</option>
            <option value="1">Si</option>
            <option value="0">No</option>
          </select>
        </div>
        {errors?.map(
          (e) => e.reminder && <p className="message-error">{e.reminder}</p>
        )}
        {err.reminder?.type === "maxLength" && (
          <p className="message-error">
            Debes ingresar los campos suministrados
          </p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <Space direction="vertical" size={12} />
            <Controller
              name="startTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  className="custom-datePicker"
                  {...field}
                  showTime
                  placeholder="Ingresa el comienzo"
                  format="YYYY-MM-DD HH:mm:ss"
                  size="9"
                />
              )}
            />
        </div>
        {errors?.map(
          (e) => e.startTime && <p className="message-error">{e.startTime}</p>
        )}
        {err.startTime?.type === "required" && (
          <p className="message-error">
            Debes ingresar el comienzo de la cita 'fecha y hora'
          </p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <Space direction="vertical" size={12} />
          <Controller
            name="endTime"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                className="custom-datePicker"
                {...field}
                showTime
                placeholder="Ingresa el final"
                format="YYYY-MM-DD HH:mm:ss"
                size="9"
              />
            )}
          />
        </div>
        {errors?.map(
          (e) => e.endTime && <p className="message-error">{e.endTime}</p>
        )}
        {err.endTime?.type === "required" && (
          <p className="message-error">
            Debes ingresar la finalización de la cita 'fecha y hora'
          </p>
        )}

        <button className="reusable-form-button">
          <span className="reusable-form-button-content">Guardar</span>
        </button>
      </form>
    </div>
  );
};

export default UpdateFormAppointment;
