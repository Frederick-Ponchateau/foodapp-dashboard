import {combineReducers} from 'redux';
import menu from './menu';
import produit from './produit';
import count from './count';
 /**** Combine tout les reducers ****/
export default combineReducers({menu,produit,count});