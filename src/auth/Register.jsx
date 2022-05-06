import React from 'react';
import './login.scss';
import logoVetlook from '../assets/images/elemento-vetlook.png';
import { validateRegisterInputs, capitalizeData } from '../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { adminRegister } from '../redux/userDucks';

const Register = () => {
  const dispatch = useDispatch();
  const err = useSelector((store) => store.user.err);

  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setError(err);
  }, [err]);

  const inputs = {
    name,
    lastName,
    email,
    pass,
  };

  return (
    <>
      <form
        onSubmit={(e) =>
          validateRegisterInputs(e, inputs, (res) => {
            if (res.valid === false) {
              setError(res.error);
            } else {
              dispatch(adminRegister(inputs));
            }
          })
        }
      >
        <div className='illustration'>
          <img
            src={logoVetlook}
            alt='vetlook-elemento'
            style={{ width: '5rem' }}
          />
          <h3 className='text-white pt-3'>Nuevo Administrador</h3>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            name='name'
            placeholder='Nombre'
            onChange={(e) =>
              capitalizeData(e.target.value, (res) => {
                setName(res);
              })
            }
            value={name}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            name='lastName'
            placeholder='Apellido'
            onChange={(e) =>
              capitalizeData(e.target.value, (res) => {
                setLastName(res);
              })
            }
            value={lastName}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            name='password'
            placeholder='Password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary btn-block' type='submit'>
            Registrar
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
