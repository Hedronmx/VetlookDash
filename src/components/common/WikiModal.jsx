import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'shards-react';

const WikiModal = ({
  open = false,
  close = () => {},
  title = <span>Hackeaste la nasa!</span>,
  body = (
    <h4>
      Ups! Parece que encontraste un modal perdido, descuida solo ciérralo y
      avisa al equipo de Meraki para que revise de donde salió.
    </h4>
  ),
  view = 'group',
  btn = 'Cerrar',
  openApp = false,
  history,
}) => {
  const goToApp = () => {
    close();
    window.location.reload();
  };

  if (view === 'groups') {
  }

  return (
    <div>
      <Modal
        className='successModal text-center'
        open={open}
        centered={true}
        size='lg'
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div>
            <img
              //   src={openApp === true ? successIcon : failedIcon}
              alt='Notification Icon'
            />
            <div className='container my-5'>{body}</div>
          </div>
          {openApp === false ? (
            <Button className='btn btn-danger' onClick={close}>
              {btn}
            </Button>
          ) : (
            <Button className='btn btn-success' onClick={goToApp}>
              {btn}
            </Button>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default WikiModal;
