import {AFF_MODAL_PRODUIT} from '../actions/types';

/*** Initialisation du state du reducer ***/
const initStateProduit = {affModalProduit : false,data:null };

/*** Fonction du reducer ***/
const produit = (state = initStateProduit, action) =>{
    //console.log("reducer produit", state, action);
    switch (action.type) {
        case AFF_MODAL_PRODUIT:
                return action.payload;
            break;
    
        default:
            break;
    }
    return state ;
} 
export default produit;
