import React from 'react';
import './login.scss';
import logoVetlook from '../assets/images/elemento-vetlook.png';
import { validateLogin } from '../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../redux/userDucks';
import Register from './Register';

const Login = () => {
  const dispatch = useDispatch();
  const err = useSelector((store) => store.user.err);

  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [forgot, setForgot] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setError(err);
  }, [err]);

  return (
    <>
      <div className='login-dark'>
        <div className='float-right m-3'>
          {error && <div className='alert alert-danger'>{error}</div>}
        </div>
        {!register ? (
          <form
            onSubmit={(e) =>
              validateLogin(e, { email, pass }, (res) => {
                if (res.valid === false) {
                  setError(res.error);
                } else {
                  dispatch(adminLogin(email, pass));
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
              <h3 className='text-white pt-3'>Bienvenido Administrador</h3>
            </div>
            {forgot}
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
                {forgot ? 'Restablecer contraseña' : 'Iniciar Sesión'}
              </button>
            </div>
            <button
              type='button'
              className='btn btn-link float-right'
              onClick={() => setForgot(!forgot)}
            >
              {forgot
                ? 'Regresar al inicio se sesión'
                : '¿Olvidaste tu contraseña?'}
            </button>
            <button
              type='button'
              className='btn btn-link float-right'
              onClick={() => setRegister(!register)}
            >
              {register
                ? 'Regresar al inicio se sesión'
                : 'Registrar nuevo admin'}
            </button>
          </form>
        ) : (
          <Register />
        )}
      </div>
    </>
  );
};

export default Login;
