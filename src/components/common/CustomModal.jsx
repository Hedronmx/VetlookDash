import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'shards-react';

const CustomModal = ({
  open = false,
  close = () => {},
  size = 'lg',
  title = <span>Hackeaste la nasa!</span>,
  body = (
    <p>
      Ups! Parece que encontraste un modal perdido, descuida solo ciérralo y
      avisa al equipo de Meraki para que revise de donde salió.
    </p>
  ),
  data,
}) => {
  React.useEffect(() => {
    // console.log('props del modal: ', data);
  }, []);
  const reloadPage = () => {
    close();
    window.location.reload();
  };
  return (
    <Modal centered={true} size={size} open={open}>
      <ModalHeader>
        {title}
        <button
          className='btn btn-danger float-right'
          onClick={close}
          style={{ marginLeft: '1.5rem' }}
        >
          X
        </button>
      </ModalHeader>
      <ModalBody>
        <div>{body}</div>
      </ModalBody>
    </Modal>
  );
};

export default CustomModal;
