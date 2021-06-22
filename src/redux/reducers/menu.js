import {AFF_MODAL_MENU, CHANGE_MENU_DATA,LOADING_MENU} from '../actions/types';

/*** Initialisation du state du reducer ***/
const initStateMenu = {affModalMenu : false,data:null,listMenus:[],loadingMenu:false };

/*** Fonction du reducer ***/
const menu = (state = initStateMenu, action) =>{
   // console.log("reducer Menu", state, action);
    switch (action.type) {
        case AFF_MODAL_MENU:
                return {...state,...action.payload}
            break;
        case CHANGE_MENU_DATA:
            return {...state,listMenus: action.payload}
        break;
        case LOADING_MENU:
        return {...state,loadingMenu:action.payload}
        break;
    
        default:
            break;
    }
    return state ;
} 
export default menu;
