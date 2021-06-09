import { db } from '../firebase';
import moment from 'moment';
import 'moment/locale/es-mx';

// constants;
const initialData = {
  loadingWiki: false,
};

// types;
const LOADING = 'LOADING';
const WIKI_ERROR = 'WIKI_ERROR';
const GROUP_LIST = 'GROUP_LIST';
const SPECIES_LIST = 'SPECIES_LIST';
const WIKI_UPDATED = 'WIKI_UPDATED';
const BREED_LIST = 'BREED_LIST';

// reducer;
export default function wikiReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loadingWiki: true };
    case WIKI_ERROR:
      return { ...initialData, err: action.payload };
    case GROUP_LIST:
      return { ...state, groups: action.payload };
    case WIKI_UPDATED:
      return { ...state, success: action.payload };
    case SPECIES_LIST:
      return {
        ...state,
        loadingWiki: false,
        species: action.payload,
      };
    case BREED_LIST:
      return { ...state, breeds: action.payload };
    default:
      return { ...state };
  }
}

/* actions */
// get all groups
export const wikiGroups = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const getGroups = () => {
      const groupsRef = db.collection('grupos');
      const groups = [];

      groupsRef.get().then((res) => {
        res.forEach((item) => {
          groups.push(item.data());
        });
      });
      console.log('grupos: ', groups);
      dispatch({
        type: GROUP_LIST,
        payload: groups,
      });
    };
    getGroups();
  } catch (error) {
    console.log('error getting groups: ', error);
  }
};

// updateWikiItem
export const updateWikiItem = (data) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  const id = data.id;
  console.log('data para actualizar: ', data);

  // console.log('info enviada para actualizar: ', data);
  try {
    await db
      .collection('RAZAS')
      .doc(id)
      .update({
        color: data.color,
        diagnosticos: data.diagnosticos,
        especieID: data.especie,
        historia: data.historia,
        nombre: data.name,
        particularidades: data.partic,
        pelaje: data.pelaje,
        vida: data.vida,
      });
    dispatch({
      type: WIKI_UPDATED,
      payload: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: WIKI_ERROR,
    });
  }
};
