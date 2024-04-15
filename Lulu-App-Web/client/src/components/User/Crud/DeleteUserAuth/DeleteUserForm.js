import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
} from '@chakra-ui/react';
import { useState } from "react";

const DeleteUserForm = ({ error, handleUserDelete }) => {

  const { register, formState: { errors }, handleSubmit } = useForm();

  const [ isOpen, setIsOpen ] = useState(false);
  const [ password, setPassword ] = useState({});

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const onDelete = () => {
    handleUserDelete(password);
    onClose();
  };

  const onSubmit = (data) => {
    setPassword({ password: data?.password });
  };

  return (
    <div className="profile-update-container" style={{ height: '100vh' }}>
      <ToastContainer className='toast-container-style' />
      <div className="profile-update-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="profile-update-form">
          <div className="profile-update-form-group">
            <label htmlFor="password_one">Confirmación de contraseña</label>
            <input style={{ borderColor: error?.message?.length > 0 || errors.password?.type.length > 0 ? 'red' : '#e81cff'}} placeholder="Ingresa tu contraseña actual" id="password_one" type="password"
              {...register("password", {
                required: true,
              })} />
          </div>
          { error?.message ? <p className='message-error' >{error?.message}</p> : null }
          {errors.password?.type === "required" && ( <p className="message-error">Debes ingresar tu contraseña</p>)}
          <button type="submit" className="profile-update-button-container" onClick={error?.message?.length > 0 || (errors?.password?.type?.length > 0) ? null : onOpen}>
                <span>¿Quieres continuar?</span>
          </button>
          <>
          <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent
              style={{ 
                backgroundColor: '#f2aafe',
                fontFamily: 'Poppins',
                border: '4px solid #fafafa',
                boxShadow: '1px 1px 10px 0px white',
              }}
            >
              <ModalHeader fontSize={'1rem'} fontWeight={800} >Confirmación</ModalHeader>
              <ModalCloseButton />
              <ModalBody style={{fontSize: '14px' }}>
                ¿Estás seguro de que deseas eliminar este usuario?
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} fontSize={'14px'} onClick={onDelete} className="mi-propio-boton">Eliminar</Button>
                <Button fontSize={'14px'} onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        </form>
      </div>
    </div>
  )
}

export default DeleteUserForm
