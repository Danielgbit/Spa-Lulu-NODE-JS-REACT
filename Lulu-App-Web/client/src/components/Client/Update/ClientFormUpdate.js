import { useEffect, useState } from "react";

const ClientFormUpdate = ({ errors, updateClient, client }) => {

    const [ values, setValues ] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    });

    const onChangeValues = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name] : value });
    };

    useEffect(() => {
        setValues({
            firstName: client?.firstName,
            middleName: client?.middleName,
            lastName: client?.lastName,
            phoneNumber: client?.phoneNumber,
            email: client?.email
        })
    }, [client]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateClient(values);
    };

  return (
    <div className="reusable-form-body">
      <h1 className="reusable-form-title">Creación de cliente</h1>
      <form className="reusable-form-container" onSubmit={handleOnSubmit}>
        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el primer nombre"
            className="textInput"
            onChange={onChangeValues}
            type="text"
            name="firstName"
            value={values.firstName}
          />
        </div>
        {errors?.map(
          (error) =>
            error.firstName && (
              <p className="message-error">{error.firstName}</p>
            )
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el segundo nombre"
            className="textInput"
            onChange={onChangeValues}
            type="text"
            name="middleName"
            value={values.middleName}
          />
        </div>
        {errors?.map(
          (error) =>
            error.middleName && (
              <p className="message-error">{error.middleName}</p>
            )
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el apellido"
            className="textInput"
            onChange={onChangeValues}
            type="text"
            name="lastName"
            value={values.lastName}
          />
        </div>
        {errors?.map(
          (error) =>
            error.lastName && <p className="message-error">{error.lastName}</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el numero de telefono"
            className="textInput"
            onChange={onChangeValues}
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={values.phoneNumber}
          />
        </div>
        {errors?.map(
          (error) =>
            error.phoneNumber && (
              <p className="message-error">{error.phoneNumber}</p>
            )
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el email @"
            className="textInput"
            onChange={onChangeValues}
            type="email"
            name="email"
            value={values.email}
          />
        </div>
        {errors?.map(
          (error) =>
            error.email && <p className="message-error">{error.email}</p>
        )}
        <button className="reusable-form-button">
          <span className="reusable-form-button-content">Guardar</span>
        </button>
      </form>
    </div>
  );
};

export default ClientFormUpdate;
