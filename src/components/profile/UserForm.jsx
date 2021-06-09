import React from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
} from 'shards-react';
import DatePicker from 'react-datepicker';
import {
  validNumber,
  capitalizeData,
  validateUserFormFields,
} from '../../utils/functions';
import { updateUserAccount } from '../../redux/userDucks';
import { useSelector, useDispatch } from 'react-redux';

import Alerts from '../common/Alerts';

const UserForm = ({ user }) => {
  console.log('UserForm: ', user);
  const dispatch = useDispatch();
  const success = useSelector((store) => store.user.success);
  const err = useSelector((store) => store.user.err);

  const [address, setAddress] = React.useState('');
  const [alert, setAlert] = React.useState({});
  const [businessType, setBusinessType] = React.useState('');
  const [cedula, setCedula] = React.useState('');
  const [dateBirth, setDateBirth] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [edit, setEdit] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [lastName, setLastName] = React.useState('');
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [telephoneContact, setTelephoneContact] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');

  React.useEffect(() => {
    const getData = () => {
      const date = new Date(user.dateBirth);
      setAddress(user.address);
      setBusinessType(user.businessType);
      setDateBirth(date.setDate(date.getDate() + 1));
      setDisplayName(user.displayName);
      setCedula(user.cedula);
      setEmail(user.email);
      setLastName(user.lastName);
      setName(user.name);
      setPhone(user.phoneNumber);
      setTelephoneContact(user.telephoneContact);
      setZipCode(user.zipCode);
    };
    getData();
  }, []);

  React.useEffect(() => {
    if (success === true) {
      setAlert({
        message: 'Datos actualizados correctamente',
        theme: 'success',
      });
      setOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (err) {
      setAlert({
        message: 'Ups, parece que hubo un error',
        theme: 'danger',
      });
      setOpen(true);
    }
  }, [success, err]);

  const userFields = () => {
    if (businessType !== null) {
      return {
        address,
        businessType,
        dateBirth,
        lastName,
        name,
        phone,
        telephoneContact,
        zipCode,
        uid: user.uid,
      };
    } else {
      return {
        address,
        dateBirth,
        lastName,
        name,
        phone,
        telephoneContact,
        zipCode,
        uid: user.uid,
      };
    }
  };

  return (
    <div>
      <Card small className='mb-4'>
        <CardHeader className='border-bottom'>
          <h6 className='m-0'>
            {businessType === 'veterinaria' ? (
              <span>Médico responsable: Dr(a). {displayName}</span>
            ) : businessType === 'estética' ? (
              <span>Encargada(o) de negocio: {displayName}</span>
            ) : (
              'Información de la cuenta'
            )}
          </h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className='p-3'>
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md='6' className='form-group'>
                      <label htmlFor='name'>Nombre</label>
                      <FormInput
                        disabled={edit}
                        id='name'
                        name='name'
                        placeholder='Nombre'
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setName(res);
                          })
                        }
                        value={name}
                      />
                    </Col>
                    <Col md='6' className='form-group'>
                      <label htmlFor='lastName'>Apellido</label>
                      <FormInput
                        disabled={edit}
                        id='lastName'
                        name='lastName'
                        placeholder='Apellido'
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setLastName(res);
                          })
                        }
                        value={lastName}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md='6' className='form-group'>
                      <label htmlFor='email'>Correo</label>
                      <FormInput
                        disabled
                        id='email'
                        type='email'
                        placeholder='Correo'
                        value={email}
                        autoComplete='email'
                      />
                    </Col>
                    <Col md='3' className='form-group'>
                      <label htmlFor='userType'>Fecha Nacimiento</label>
                      <DatePicker
                        disabled={edit}
                        className='form-control'
                        dateFormat='dd/MM/yyyy'
                        placeholderText='Selecciona fecha'
                        selected={dateBirth}
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        dateFormatCalendar='MMMM'
                        yearDropdownItemNumber={90}
                        scrollableYearDropdown
                        onChange={(date) => {
                          // console.log(
                          //   'fecha seleccionada: ',
                          //   moment(date).format('YYYY-MM-DD')
                          // );
                          setDateBirth(date);
                        }}
                      />
                    </Col>
                    <Col md='3' className='form-group'>
                      <label htmlFor='phone'>Teléfono Personal</label>
                      <FormInput
                        disabled={edit}
                        id='phone'
                        placeholder='Teléfono Personal'
                        type='text'
                        minLength='10'
                        maxLength='10'
                        name='phone'
                        onChange={(e) =>
                          validNumber(e.target.value, (res) => {
                            setPhone(res.value);
                            setError(res.error);
                          })
                        }
                        value={phone}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md='6' className='form-group'>
                      <label htmlFor='address'>Dirección</label>
                      <FormInput
                        disabled={edit}
                        id='address'
                        name='address'
                        placeholder='Dirección'
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setAddress(res);
                          })
                        }
                        value={address}
                      />
                    </Col>
                    <Col md='3' className='form-group'>
                      <label htmlFor='zipCode'>Código postal</label>
                      <FormInput
                        disabled={edit}
                        id='zipCode'
                        placeholder='Código postal'
                        type='text'
                        minLength='5'
                        maxLength='5'
                        name='zipCode'
                        onChange={(e) =>
                          validNumber(e.target.value, (res) => {
                            setZipCode(res.value);
                            setError(res.error);
                          })
                        }
                        value={zipCode}
                      />
                    </Col>
                    {user.typeUser === 'negocio' && (
                      <Col md='3' className='form-group'>
                        <label htmlFor='telephoneContact'>
                          Teléfono Negocio
                        </label>
                        <FormInput
                          disabled={edit}
                          id='telephoneContact'
                          placeholder='Teléfono Negocio'
                          type='text'
                          minLength='10'
                          maxLength='10'
                          name='telephoneContact'
                          onChange={(e) =>
                            validNumber(e.target.value, (res) => {
                              setTelephoneContact(res.value);
                              setError(res.error);
                            })
                          }
                          value={telephoneContact}
                        />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col md='4' className='form-group'>
                      <Button
                        type='button'
                        theme='accent'
                        onClick={(e) => {
                          if (!edit) {
                            validateUserFormFields(e, userFields(), (res) => {
                              console.log('respuesta validacion info: ', res);
                              if (res.valid === false) {
                                setError(res.error);
                              } else {
                                setError(null);
                                dispatch(updateUserAccount(userFields()));
                              }
                            });
                          } else {
                            setEdit(!edit);
                          }
                        }}
                      >
                        {edit ? 'Habilitar Campos' : 'Guardar Cambios'}
                      </Button>
                    </Col>
                    <Col md='8' className='form-group'>
                      {error && (
                        <div className='alert alert-warning'>{error}</div>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
      <Alerts
        open={open}
        close={() => {
          setOpen(!open);
        }}
        message={alert.message}
        theme={alert.theme}
      />
    </div>
  );
};

export default UserForm;
