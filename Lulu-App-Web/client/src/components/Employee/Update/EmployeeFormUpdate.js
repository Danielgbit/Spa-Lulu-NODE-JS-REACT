import { useEffect, useState } from "react";

const EmployeeFormUpdate = ({ updateEmployee, employee }) => {

    const [ values, setValues ] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        position: '',
        biography: ''
    });

    useEffect(() => {
        setValues({
            fullName: employee.fullName,
            phoneNumber: employee.phoneNumber,
            email: employee.email,
            position: employee.position,
            biography: employee.biography
        })
    }, [employee]);
    
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateEmployee(values);
    };

    return(
        <div className='reusable-form-body' >
            <h1 className='reusable-form-title' >Actualización de empleado</h1>
            <form className="reusable-form-container" onSubmit={handleOnSubmit}>
                <div className="reusable-crud-form-text-input-wrapper">
                    <input className="textInput" placeholder="Ingrese el nombre" onChange={onChangeInput} type="text" name="fullName" value={values.fullName}/>   
                </div>
                <div className="reusable-crud-form-text-input-wrapper">
                    <input className="textInput" placeholder="Ingrese el puesto de trabajo" onChange={onChangeInput} type="text" name="position" value={values.position}/>
                </div>

                <div className="reusable-crud-form-text-input-wrapper">
                    <input className="textInput" placeholder="Ingrese el email" onChange={onChangeInput} type="email" name="email" value={values.email}/>   
                </div>

                <div className="reusable-crud-form-text-input-wrapper">
                    <input className="textInput" placeholder="Ingrese el telefono" onChange={onChangeInput} type="number" name="phoneNumber" value={values.phoneNumber}/> 
                </div>

                <div className="reusable-crud-form-text-input-wrapper">
                    <textarea className='input-textArea' onChange={onChangeInput} placeholder="Ingrese una descripcion o biografia" type="number" name="biography" value={values.biography}/>
                </div>
                <button className="reusable-form-button">
                    <span className="reusable-form-button-content">Guardar</span>
                </button>
            </form>
        </div>
    );
};

export default EmployeeFormUpdate