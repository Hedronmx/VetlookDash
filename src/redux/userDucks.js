import { auth, db } from '../firebase';
import moment from 'moment';
import 'moment/locale/es-mx';

// constants;
const initialData = {
  loading: false,
  active: false,
};

// types;
const LOADING = 'LOADING';
const USER_ERROR = 'USER_ERROR';
const USER_SUCCESS = 'USER_SUCCESS';
const CLOSE_SESSION = 'CLOSE_SESSION';
const REGISTER_USER = 'REGISTER_USER';
const VALIDATED_USER = 'VALIDATED_USER';
const GET_USER_INFO = 'GET_USER_INFO';
const USER_UPDATED = 'USER_UPDATED';

const USERS_LIST = 'USERS_LIST';
const CLIENT_STORE = 'CLIENT_STORE';
const STORES_LIST = 'STORES_LIST';

// reducer;
export default function userReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case USER_ERROR:
      return { ...initialData, err: action.payload };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        uid: action.payload.uid,
        active: true,
      };
    case CLOSE_SESSION:
      return { ...initialData };
    case REGISTER_USER:
      return {
        ...state,
        loading: true,
        reset: '',
        err: null,
        user: action.payload,
      };
    case VALIDATED_USER:
      return { ...state, token: action.payload, validated: true };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
        active: true,
      };
    case USER_UPDATED:
      return {
        ...state,
        success: action.payload,
      };
    case USERS_LIST:
      return { ...state, users: action.payload };
    case CLIENT_STORE:
      return {
        ...state,
        clientStores: action.payload,
      };
    case STORES_LIST:
      return { ...state, stores: action.payload };
    default:
      return { ...state };
  }
}

// actions
export const adminLogin = (email, pass) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const res = await auth.signInWithEmailAndPassword(email, pass);

    const getAndDispatch = async () => {
      const doc = await db
        .collection('ADMIN')
        .doc(res.user.uid)
        .get();

      // console.log('user data: ', doc.data());

      const user = {
        name: doc.data().name,
        lastName: doc.data().lastName,
        createdAt: doc.data().createdAt,
        email: doc.data().email,
        emailVerified: doc.data().emailVerified,
        uid: doc.data().uid,
        phoneNumber: doc.data().phoneNumber,
        photo: doc.data().photo,
        type: doc.data().type,
      };
      dispatch({
        type: USER_SUCCESS,
        payload: {
          uid: res.user.uid,
          user: user,
        },
      });
    };

    getAndDispatch();
    localStorage.setItem('uid', JSON.stringify(res.user.uid));
  } catch (error) {
    console.log('error en login: ', error);
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/invalid-email'
    ) {
      dispatch({
        type: USER_ERROR,
        payload: 'No se encontró el usuario',
      });
    }
    if (error.code === 'auth/wrong-password') {
      dispatch({
        type: USER_ERROR,
        payload: 'Las credenciales no coinciden',
      });
    }
    if (error.code === 'auth/too-many-requests') {
      dispatch({
        type: USER_ERROR,
        payload:
          'Demasiados intentos: se ha bloqueado el acceso temporalmente, pruebe más tarde',
      });
    }
  }
};

export const adminRegister = (data) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const res = await auth.createUserWithEmailAndPassword(
      data.email,
      data.pass
    );
    await db
      .collection('ADMIN')
      .doc(res.user.uid)
      .set({
        name: data.name,
        lastName: data.lastName,
        createdAt: moment().format('YYYYMMDDHHmmss'),
        email: data.email,
        emailVerified: false,
        uid: res.user.uid,
        phoneNumber: '',
        photo: '',
        type: 'admin',
      });

    const getAndDispatch = async () => {
      const doc = await db
        .collection('ADMIN')
        .doc(res.user.uid)
        .get();
      const user = {
        name: doc.data().name,
        lastName: doc.data().lastName,
        createdAt: doc.data().createdAt,
        email: doc.data().email,
        emailVerified: doc.data().emailVerified,
        uid: doc.data().uid,
        phoneNumber: doc.data().phoneNumber,
        photo: doc.data().photo,
        type: doc.data().type,
      };
      console.log('user document: ', user);
      dispatch({
        type: USER_SUCCESS,
        payload: {
          uid: res.user.uid,
          user: user,
        },
      });
    };

    getAndDispatch();
    localStorage.setItem('uid', JSON.stringify(res.user.uid));
  } catch (error) {
    // console.log(err);
    if (error.code === 'auth/invalid-email') {
      dispatch({
        type: USER_ERROR,
        payload: 'El correo es inválido',
      });
    }
    if (error.code === 'auth/email-already-in-use') {
      dispatch({
        type: USER_ERROR,
        payload: 'El correo ya esta en uso',
      });
    }
  }
};

export const checkActiveUser = () => async (dispatch) => {
  const uid = localStorage.getItem('uid');
  if (uid) {
    dispatch({
      type: USER_SUCCESS,
      payload: JSON.parse(uid),
    });
  }
};

export const getUserData = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const uid = JSON.parse(localStorage.getItem('uid'));
    const doc = await db
      .collection('ADMIN')
      .doc(uid)
      .get();

    const user = {
      name: doc.data().name,
      lastName: doc.data().lastName,
      createdAt: doc.data().createdAt,
      email: doc.data().email,
      emailVerified: doc.data().emailVerified,
      uid: doc.data().uid,
      phoneNumber: doc.data().phoneNumber,
      photo: doc.data().photo,
      type: doc.data().type,
    };
    dispatch({
      type: USER_SUCCESS,
      payload: {
        uid: uid,
        user: user,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

export const closeSession = () => (dispatch) => {
  dispatch({
    type: CLOSE_SESSION,
  });
  setTimeout(() => {
    auth.signOut();
    localStorage.clear();
    window.location.reload();
  }, 0);
};

// functions to get all users from firestore
export const allUsers = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const getUserList = () => {
      const usersRef = db.collection('USUARIOS');
      const all = [];
      const vets = [];
      const estet = [];
      const others = [];
      const users = [];
      const clients = [];
      usersRef
        .where('businessType', '==', 'veterinaria')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const user = {
              address: doc.data().address,
              businessType: doc.data().businessType,
              cedula: doc.data().cedula,
              createdAt: doc.data().createdAt,
              dateBirth: doc.data().dateBirth,
              displayName: doc.data().displayName,
              email: doc.data().email,
              expiration_date: doc.data().expiration_date,
              freeMonth: doc.data().freeMonth,
              freeMonthExpiration: doc.data().freeMonthExpiration,
              lastName: doc.data().lastName,
              membership: doc.data().membership,
              membershipCancelled: doc.data().stripe.cancel.cancelled,
              cancelled_date: doc.data().stripe.cancel.cancel_date,
              name: doc.data().name,
              paymentMethod: doc.data().stripe.method.option,
              pending: doc.data().stripe.method.pending,
              phoneNumber: doc.data().phoneNumber,
              photoURL: doc.data().photoURL,
              providerData: doc.data().providerData,
              responsibleDoctor: doc.data().responsibleDoctor,
              subscription_id: doc.data().subscription_id,
              telephoneContact: doc.data().telephoneContact,
              typeUser: doc.data().typeUser,
              uid: doc.data().uid,
              verifiedCedula: doc.data().verifiedCedula,
              zipCode: doc.data().zipCode,
            };
            vets.push(user);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      usersRef
        .where('businessType', '==', 'estética')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const user = {
              address: doc.data().address,
              businessType: doc.data().businessType,
              cedula: doc.data().cedula,
              createdAt: doc.data().createdAt,
              dateBirth: doc.data().dateBirth,
              displayName: doc.data().displayName,
              email: doc.data().email,
              expiration_date: doc.data().expiration_date,
              freeMonth: doc.data().freeMonth,
              freeMonthExpiration: doc.data().freeMonthExpiration,
              lastName: doc.data().lastName,
              membership: doc.data().membership,
              membershipCancelled: doc.data().stripe.cancel.cancelled,
              cancelled_date: doc.data().stripe.cancel.cancel_date,
              name: doc.data().name,
              paymentMethod: doc.data().stripe.method.option,
              pending: doc.data().stripe.method.pending,
              phoneNumber: doc.data().phoneNumber,
              photoURL: doc.data().photoURL,
              providerData: doc.data().providerData,
              responsibleDoctor: doc.data().responsibleDoctor,
              subscription_id: doc.data().subscription_id,
              telephoneContact: doc.data().telephoneContact,
              typeUser: doc.data().typeUser,
              uid: doc.data().uid,
              verifiedCedula: doc.data().verifiedCedula,
              zipCode: doc.data().zipCode,
            };
            estet.push(user);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      usersRef
        .where('businessType', '==', 'others')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const user = {
              address: doc.data().address,
              businessType: doc.data().businessType,
              cedula: doc.data().cedula,
              createdAt: doc.data().createdAt,
              dateBirth: doc.data().dateBirth,
              displayName: doc.data().displayName,
              email: doc.data().email,
              expiration_date: doc.data().expiration_date,
              freeMonth: doc.data().freeMonth,
              freeMonthExpiration: doc.data().freeMonthExpiration,
              lastName: doc.data().lastName,
              membership: doc.data().membership,
              membershipCancelled: doc.data().stripe.cancel.cancelled,
              cancelled_date: doc.data().stripe.cancel.cancel_date,
              name: doc.data().name,
              paymentMethod: doc.data().stripe.method.option,
              pending: doc.data().stripe.method.pending,
              phoneNumber: doc.data().phoneNumber,
              photoURL: doc.data().photoURL,
              providerData: doc.data().providerData,
              responsibleDoctor: doc.data().responsibleDoctor,
              subscription_id: doc.data().subscription_id,
              telephoneContact: doc.data().telephoneContact,
              typeUser: doc.data().typeUser,
              uid: doc.data().uid,
              verifiedCedula: doc.data().verifiedCedula,
              zipCode: doc.data().zipCode,
            };
            others.push(user);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      usersRef
        .where('typeUser', '==', 'usuario')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const user = {
              address: doc.data().address,
              businessType: doc.data().businessType,
              cedula: doc.data().cedula,
              createdAt: doc.data().createdAt,
              dateBirth: doc.data().dateBirth,
              displayName: doc.data().displayName,
              email: doc.data().email,
              expiration_date: doc.data().expiration_date,
              freeMonth: doc.data().freeMonth,
              freeMonthExpiration: doc.data().freeMonthExpiration,
              lastName: doc.data().lastName,
              membership: doc.data().membership,
              membershipCancelled: doc.data().stripe.cancel.cancelled,
              cancelled_date: doc.data().stripe.cancel.cancel_date,
              name: doc.data().name,
              paymentMethod: doc.data().stripe.method.option,
              pending: doc.data().stripe.method.pending,
              phoneNumber: doc.data().phoneNumber,
              photoURL: doc.data().photoURL,
              providerData: doc.data().providerData,
              responsibleDoctor: doc.data().responsibleDoctor,
              subscription_id: doc.data().subscription_id,
              telephoneContact: doc.data().telephoneContact,
              typeUser: doc.data().typeUser,
              uid: doc.data().uid,
              verifiedCedula: doc.data().verifiedCedula,
              zipCode: doc.data().zipCode,
            };
            users.push(user);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      usersRef
        .where('typeUser', '==', 'negocio')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const user = {
              address: doc.data().address,
              businessType: doc.data().businessType,
              cedula: doc.data().cedula,
              createdAt: doc.data().createdAt,
              dateBirth: doc.data().dateBirth,
              displayName: doc.data().displayName,
              email: doc.data().email,
              expiration_date: doc.data().expiration_date,
              freeMonth: doc.data().freeMonth,
              freeMonthExpiration: doc.data().freeMonthExpiration,
              lastName: doc.data().lastName,
              membership: doc.data().membership,
              membershipCancelled: doc.data().stripe.cancel.cancelled,
              cancelled_date: doc.data().stripe.cancel.cancel_date,
              name: doc.data().name,
              paymentMethod: doc.data().stripe.method.option,
              pending: doc.data().stripe.method.pending,
              phoneNumber: doc.data().phoneNumber,
              photoURL: doc.data().photoURL,
              providerData: doc.data().providerData,
              responsibleDoctor: doc.data().responsibleDoctor,
              subscription_id: doc.data().subscription_id,
              telephoneContact: doc.data().telephoneContact,
              typeUser: doc.data().typeUser,
              uid: doc.data().uid,
              verifiedCedula: doc.data().verifiedCedula,
              zipCode: doc.data().zipCode,
            };
            clients.push(user);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      usersRef.onSnapshot((snap) => {
        snap.forEach((doc) => {
          const user = {
            address: doc.data().address,
            businessType: doc.data().businessType,
            cedula: doc.data().cedula,
            createdAt: doc.data().createdAt,
            dateBirth: doc.data().dateBirth,
            displayName: doc.data().displayName,
            email: doc.data().email,
            expiration_date: doc.data().expiration_date,
            freeMonth: doc.data().freeMonth,
            freeMonthExpiration: doc.data().freeMonthExpiration,
            lastName: doc.data().lastName,
            membership: doc.data().membership,
            membershipCancelled: doc.data().stripe.cancel.cancelled,
            cancelled_date: doc.data().stripe.cancel.cancel_date,
            name: doc.data().name,
            paymentMethod: doc.data().stripe.method.option,
            pending: doc.data().stripe.method.pending,
            phoneNumber: doc.data().phoneNumber,
            photoURL: doc.data().photoURL,
            providerData: doc.data().providerData,
            responsibleDoctor: doc.data().responsibleDoctor,
            subscription_id: doc.data().subscription_id,
            telephoneContact: doc.data().telephoneContact,
            typeUser: doc.data().typeUser,
            uid: doc.data().uid,
            verifiedCedula: doc.data().verifiedCedula,
            zipCode: doc.data().zipCode,
          };
          all.push(user);
        });
        dispatch({
          type: USERS_LIST,
          payload: {
            numbers: {
              all: all.length,
              vets: vets.length,
              estet: estet.length,
              others: others.length,
              users: users.length,
              clients: clients.length,
            },
            all,
            vets,
            estet,
            others,
            users,
            clients,
          },
        });
      });
    };
    getUserList();
  } catch (error) {
    console.log('error al traer all los usuarios: ', error);
  }
};

// update user account
export const updateUserAccount = (data) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  const uid = data.uid;
  console.log('data para actualizar: ', data);
  const validateBirth = () => {
    if (
      isNaN(data.dateBirth) ||
      data.dateBirth === null ||
      data.dateBirth === undefined
    ) {
      return '';
    } else {
      return moment(data.dateBirth).format('YYYY-MM-DD');
    }
  };
  // console.log('info enviada para actualizar: ', data);
  try {
    await db
      .collection('USUARIOS')
      .doc(uid)
      .update({
        address: data.address,
        dateBirth: validateBirth(),
        displayName: `${data.name} ${data.lastName}`,
        fullName: `${data.name} ${data.lastName}`,
        lastName: data.lastName,
        name: data.name,
        phoneNumber: data.phone,
        responsibleDoctor: `${data.name} ${data.lastName}`,
        telephoneContact: data.telephoneContact,
        zipCode: data.zipCode,
      });
    dispatch({
      type: USER_UPDATED,
      payload: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ERROR,
    });
  }
};

// get all stores
export const allStores = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const storesRef = db.collection('UBICACIONES');
    let vets = [];
    const estet = [];
    const others = [];

    storesRef.where('businessType', '==', 'veterinaria').onSnapshot((snap) => {
      snap.forEach((res) => {
        vets.push(res.data());
      });
    });
    storesRef.where('businessType', '==', 'estética').onSnapshot((snap) => {
      snap.forEach((res) => {
        estet.push(res.data());
      });
    });
    storesRef.where('businessType', '==', 'otros').onSnapshot((snap) => {
      snap.forEach((res) => {
        others.push(res.data());
      });
    });
    dispatch({
      type: STORES_LIST,
      payload: { vets, estet, others },
    });
  } catch (error) {
    console.log('error finding client store: ', error);
  }
};

// get client store
export const clientStores = (uid) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const getClientStore = () => {
      const storesRef = db.collection('UBICACIONES');
      const stores = [];

      storesRef
        .where('userId', '==', uid)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            stores.push(doc.data());
          });
          dispatch({
            type: CLIENT_STORE,
            payload: stores,
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    };
    getClientStore();
  } catch (error) {
    console.log('error finding client store: ', error);
  }
};
