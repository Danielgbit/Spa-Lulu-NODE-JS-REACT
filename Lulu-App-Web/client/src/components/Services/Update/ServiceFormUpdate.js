import { useEffect } from "react";
import { useForm } from "react-hook-form";


const ServiceFormUpdate = ({ categories, errors, service, updateService }) => {

    
    function removeSemiColons(numero) {
        return numero.toString()?.replace(/[.,]/g, '');
    };

    const handleOnSubmit = (data) => {
        updateService({ ...data, image: data.image[0], price: removeSemiColons(data?.price)});
    };

    const { register, formState: {errors: err}, handleSubmit, setValue, watch  } = useForm();

    useEffect(() => {
        setValue('serviceName', service.serviceName);
        setValue('description', service.description);
        setValue('durationMinutes', service.durationMinutes);
        setValue('price', service.price);
        setValue('categoryId', service.categoryId);
        setValue('image', service.image);
    }, [service]);

    return(
        <div className='reusable-form-body' >
        <h1 className='reusable-form-title' >Actualización de servicio</h1>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="reusable-form-container" >
            <div className="reusable-crud-form-text-input-wrapper"  >
                <input  className="textInput" placeholder="Ingresa el nombre del servicio" type="text" { ...register('serviceName', {
                    required: true,
                    maxLength: 100
                })} />    
            </div>
            { errors?.map((e) => e.serviceName && <p className='message-error' >{e.serviceName}</p>) }
            { err.serviceName?.type === 'required' && <p className='message-error'>Debes ingresar el nombre del servicio</p> }
            { err.serviceName?.type === 'maxLength' && <p className='message-error'>Has escedido los 100 caracteres</p> }

            <div className="reusable-crud-form-text-input-wrapper"  >
                <textarea placeholder="Ingresa una descripción detallada"  className='input-textArea'  type="text"  { ...register('description', {
                    required: true,
                    maxLength: 140
                })} />
            </div>
            { errors?.map((e) => e.description && <p className='message-error' >{ e.description}</p>) }
            { err.description?.type === 'required' && <p className='message-error'>Debes ingresar una descripción</p> }
            { err.description?.type === 'maxLength' && <p className='message-error'>Solo se permiten 140 caracteres</p> }

            <div className="reusable-crud-form-text-input-wrapper"  >
                <input  className="textInput" placeholder="ingresa la duración del servicio (minutos)" type="number" { ...register('durationMinutes', {
                    required: true,
                    valueAsNumber: true,
                    maxLength: 10
                })} />     
            </div>
            { errors?.map((e) => e.durationMinutes && <p className='message-error' >{ e.durationMinutes}</p>) }
            { err.durationMinutes?.type === 'required' && <p className='message-error'>Debes ingresar la duración del servicio</p> }
            { err.durationMinutes?.type === 'maxLength' && <p className='message-error'>Solo se permiten 10 caracteres</p> }
            { err.durationMinutes?.type === 'valueAsNumber' && <p className='message-error'>Debes ingresar un valor numerico</p> }


            <div className="reusable-crud-form-text-input-wrapper"  >
                <input placeholder="Ingresa un precio $" className="textInput" type="text" {...register('price', {
                    required: true,
                    maxLength: 20,
                    pattern: /^[0-9.,]+$/
                })} />
            </div>
            { errors?.map((e) => e.price && <p className='message-error' >{ e.price}</p>) }
            { err.price?.type === 'required' && <p className='message-error'>Debes ingresar el precio del servicio</p> }
            { err.price?.type === 'maxLength' && <p className='message-error'>Solo se permiten 20 caracteres</p> }
            { err.price?.type === 'pattern' && <p className='message-error'>Solo se permiten numeros, puntos y comas</p> }

            <div className="reusable-crud-form-text-input-wrapper"  >
                <select className="textInput"  placeholder='Ingresa la categoria del servicio' { ...register('categoryId', {
                    required: true,
                })} >
                        <option value="">Selecciona una categoria</option>
                    {categories?.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                    ))}
                </select>
            </div>
                { errors?.map((e) => e.categoryId && <p className='message-error' >{ e.categoryId}</p>) }
                { err.categoryId?.type === 'required' && <p className='message-error'>Debes seleccionar una categoria</p> }

                <div className="reusable-crud-form-text-input-wrapper" style={{ height: '150px' }} >
                    <img style={{ objectFit: 'cover', height: '100%', borderRadius: '10px' }} src={watch('image') && watch('image')} alt="imagen servicio"/> 
                </div> 

            <div className="reusable-crud-form-text-input-wrapper"  >
                <div className="input-img">
                    <label htmlFor="image" className='area-register-img' >Sube una imagen
                        <i className="fa-solid fa-circle-up"></i>
                        <label htmlFor="image" className="custom-file-input custom-register form-dropArea-imgs-singUp">
                        <input
                                className="inputFile"
                                type="file"
                                accept=".jpg,.jpeg,.png,.gif"
                                id="image"
                                {...register('image', /* {
                                    validate: {
                                    validFileType: (value) => {
                                        if (!value || !value[0]) return true; // Permitir que el campo esté vacío
                                        return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
                                    }
                                    }
                                } */)}
                                />
                        </label>
                    </label>
                </div>
            </div>
                { errors?.map((e) => e.image && <p className='message-error' >{ e.image}</p>) }
                { err.image?.type === 'validFileType' && <p className='message-error'>La imagen debe ser de formato JPG, PNG o GIF</p>}

            <button className="reusable-form-button">
                <span className="reusable-form-button-content">Guardar</span>
            </button>
        </form>
    </div>
    )
};

export default ServiceFormUpdate;