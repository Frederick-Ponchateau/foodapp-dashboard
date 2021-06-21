import {AFF_MODAL_MENU, AFF_MODAL_PRODUIT} from '../actions/types';

/*** Initialisation du state du reducer ***/
const initStateMenu = {affModalMenu : false,data:null };

/*** Fonction du reducer ***/
const menu = (state = initStateMenu, action) =>{
    console.log("reducer Menu", state, action);
    switch (action.type) {
        case AFF_MODAL_MENU:
                return action.payload;
            break;
          
        break;
    
        default:
            break;
    }
    return state ;
} 
export default menu;
