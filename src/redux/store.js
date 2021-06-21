import {createStore} from 'redux';
import rootReducer from './reducers';


/***** Recupere tout les reducers *****/
export default createStore(rootReducer);