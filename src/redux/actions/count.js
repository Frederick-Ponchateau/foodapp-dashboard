import {CHANGE_COUNT,RESET_COUNT,AFFICHAGE} from './types';
/*******
 * * (payload) = nouvelle valeur */
export const  changeCount = (payload)=>({
    type: CHANGE_COUNT,
    payload
});
export const  resetCount = (payload)=>({
    type: RESET_COUNT,
    payload
});
export const  affichage = (payload)=>({
    type: AFFICHAGE,
    payload
});