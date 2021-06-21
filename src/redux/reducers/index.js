import {combineReducers} from 'redux';
import menu from './menu';
import produit from './produit';
 /**** Combine tout les reducers ****/
export default combineReducers({menu,produit});