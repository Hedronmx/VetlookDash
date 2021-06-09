export function getDomain(value, callback = () => {}) {
  if (value !== '') {
    if (!value.match(/^[a-zA-Z]+:/)) {
      value = 'https://' + value;
    }
    callback({ value });
  }
}

export function validNumber(value, callback = () => {}) {
  // let res = null;
  const regex = /^[0-9\b]+$/;
  if (value === '' || regex.test(value)) {
    // console.log('si es numero');
    callback({ value, error: '' });
  } else {
    // console.log('no es numero');
    callback({ value: '', error: 'Solo se admiten números' });
  }
}

export function capitalizeData(value, callback = () => {}) {
  const word = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  callback(word);
}

export function validateLogin(e, data, callback = () => {}) {
  e.preventDefault();
  let error = '';

  if (!data.email.trim() || !data.pass.trim()) {
    // console.log('Ingresa un correo válido');
    error = 'Todos los campos son obligatorios';
    callback({ valid: false, error });
  }

  callback({ valid: true, error: '' });
}

export function validateRegisterInputs(e, data, callback = () => {}) {
  e.preventDefault();
  let error = '';

  if (
    !data.name.trim() ||
    !data.lastName.trim() ||
    !data.email.trim() ||
    !data.pass.trim()
  ) {
    error = 'Todos los campos son obligatorios';
    callback({ valid: false, error });
  }
  if (data.pass.length < 8) {
    error = 'La contraseña debe tener mínimo 8 caractéres';
    callback({ valid: false, error });
    return;
  }

  callback({ valid: true, error: '' });
}

// validate if all inputs are filled in UserForm component
export function validateUserFormFields(e, data, callback = () => {}) {
  e.preventDefault();
  let error = '';
  console.log('datos apra validar: ', data);
  if (
    data.name === '' ||
    data.lastName === '' ||
    data.address === '' ||
    data.zipCode === '' ||
    data.telephoneContact === ''
  ) {
    error = 'Todos los campos son obligatorios';
    callback({ valid: false, error });
    return;
  }
  callback({ valid: true, error: '' });
}

// validate wiki fields
export function validateWikiFields(e, data, callback = () => {}) {
  e.preventDefault();
  let error = '';
  console.log('datos para validar: ', data);
  if (
    data.color === '' ||
    data.diagnosticos === '' ||
    data.especie === '' ||
    data.historia === '' ||
    data.name === '' ||
    data.partic === '' ||
    data.pelaje === '' ||
    data.vida === ''
  ) {
    error = 'Todos los campos son obligatorios';
    callback({ valid: false, error });
    return;
  }
  callback({ valid: true, error: '' });
}
