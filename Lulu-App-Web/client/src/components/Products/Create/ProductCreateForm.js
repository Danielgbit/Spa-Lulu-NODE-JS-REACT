import { useForm, Controller } from 'react-hook-form'
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';



const ProductCreateForm = ({ categories, createProduct, errorsBack }) => {

    const { register, formState: {errors: eForm}, handleSubmit, control } = useForm();
    const [fileList, setFileList] = useState([]);

    function removeSemiColons(numero) {
        return numero.toString()?.replace(/[.,]/g, '');
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };


    const onSubmit = (data) => {
        createProduct({...data, images: data.images, image: data.image[0], price: removeSemiColons(data?.price)}); 
    };

    return (
        <div className='reusable-form-body' >
            <h1 className='reusable-form-title' >Creación de producto</h1>
            <form className="reusable-form-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="reusable-crud-form-text-input-wrapper" > 
                    <input type="text" placeholder="Ingresa el nombre del producto" className="textInput" {...register('name', {
                        required: true,
                        maxLength: 50
                    })}></input>
                </div>
                    { eForm.name?.type === 'required' && <p  className='message-error' >Debes ingresar un nombre</p> }
                    { eForm.name?.type === 'maxLength' && <p  className='message-error' >Solo es permitido 50 caracteres</p> }  
                    { errorsBack?.map(e => e.name && <p className='message-error' >{e.name}</p>) }


                <div className="reusable-crud-form-text-input-wrapper" > 
                    <input type="number" placeholder="Ingresa el stock" className="textInput" {...register('stock', {
                        required: true,
                        maxLength: 18,
                        pattern: /^\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/
                    })}></input>
                </div>
                    { eForm.stock?.type === 'required' && <p className='message-error'  >Debes ingresar un numero de stock</p> }
                    { eForm.stock?.type === 'maxLength' && <p className='message-error'  >Maximo permitido 18 caracteres</p> }
                    { eForm.stock?.type === 'pattern' && <p className='message-error'  >Debe ser un valor numerico valido</p> }    

                <div className="reusable-crud-form-text-input-wrapper" > 
                    <input type="number" placeholder="% Ingresa un descuento" className="textInput" {...register('discount', {
                        maxLength: 3,
                        pattern: /^(?:[1-9]\d?|100)$/
                    })}></input>
                </div>
                    { eForm.discount?.type === 'maxLength' && <p className='message-error'  >Maximo 3 caracteres</p> }
                    { eForm.discount?.type === 'pattern' && <p className='message-error'  >Debe ser un valor del 1 al 100</p> }    

                <div className="reusable-crud-form-text-input-wrapper" > 
                    <textarea type="text" placeholder="Suministra una descrición" className='input-textArea' {...register('description', {
                        minLength: 30,
                        required: true,
                        maxLength: 140
                    })}></textarea>
                </div>
                    { eForm.description?.type === 'required' && <p className='message-error'  >Debes ingresar una descripción</p> }    
                    { eForm.description?.type === 'minLength' && <p className='message-error'  >Debes agregar almenos 30 caracteres</p> }
                    { eForm.description?.type === 'maxLength' && <p className='message-error'  >Maximo permitido 140 caracteres</p> }      
                    { errorsBack?.map(e => e.description && <p className='message-error' >{e.description}</p>) }

                <div className="reusable-crud-form-text-input-wrapper" > 
                    <input type="text" placeholder="$ Ingresa un precio" className="textInput" {...register('price', {
                        required: true,
                        maxLength: 20,
                        pattern: /^[0-9.,]+$/
                    })}></input>
                </div>
                    { eForm.price?.type === 'required' && <p className='message-error'>Debes ingresar el precio del producto</p> }
                    { eForm.price?.type === 'maxLength' && <p className='message-error'>Solo se permiten 20 caracteres</p> }
                    { eForm.price?.type === 'pattern' && <p className='message-error'>Solo se permiten numeros, puntos y comas</p> }
                    { errorsBack?.map(e => e.price && <p className='message-error' >{e.price}</p>) }

                <div className="reusable-crud-form-text-input-wrapper" > 
                    <select className="textInput" {...register('categoryId', {
                        required: true,
                        valueAsNumber: true
                    })}>
                            <option defaultChecked value="">Seleccion una categoria</option>
                        {categories?.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>
                    { eForm.categoryId?.type === 'required' && <p className='message-error'  >Debes seleccionar una categoria</p> }    
                    { eForm.categoryId?.type === 'valueAsNumber' && <p className='message-error'  >Debe ser un valor numerico</p> }
                    { errorsBack?.map(e => e.category && <p className='message-error' >{e.category}</p>) }

                    <div className="reusable-crud-form-text-input-wrapper"  >
                    <label htmlFor='imagePrimary'>Imagen primaria</label>
                    <div className="input-img">
                        <label htmlFor="image" className='area-register-img' >Sube la imagen primaria
                            <i className="fa-solid fa-circle-up"></i>
                            <label htmlFor="image" className="custom-file-input custom-register form-dropArea-imgs-singUp">
                                <input  className="inputFile" type="file" accept=".jpg,.jpeg,.png,.gif" id="image" { ...register('image', {
                                    required: 'Por favor, selecciona un archivo',
                                    validate: {
                                        validFileType: (value) => {
                                            if (!value) return true;
                                            return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
                                        }
                                    }
                                })}/>
                            </label>
                        </label>
                    </div>
                    </div>

                    <div className="reusable-crud-form-text-input-wrapper"  >
                    <label htmlFor='imagePrimary'>Carrete de imagenes</label>

                    <Controller
                        name="images"
                        control={control}
                        render={({ field }) => (
                            <ImgCrop rotate>
                            <Upload
                                {...field}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                maxCount={3}
                                onChange={(info) => {
                                const { fileList: newFileList } = info;
                                setFileList(newFileList);
                                field.onChange(newFileList);
                                }}
                                onPreview={onPreview}
                            >
                                {fileList.length < 3 && <i style={{ color: 'white', fontSize:'20px' }} className="fa-solid fa-plus"></i> }
                            </Upload>
                        </ImgCrop>
                        )}
                    />
                    </div>
                    

                    
{/*                     { eForm.image?.type === 'required' && <p className='message-error'>Debes seleccionar una imagen</p>}
                    { eForm.image?.type === 'validFileType' && <p className='message-error'>La imagen debe ser de formato JPG, PNG o GIF</p>}
                    { errorsBack?.map(e => e.image && <p className='message-error' >{e.image}</p>) } */}

                    

                    <button className="reusable-form-button">
                            <span className="reusable-form-button-content">Guardar</span>
                    </button>
            </form>

        </div>
    )
};

export default ProductCreateForm;