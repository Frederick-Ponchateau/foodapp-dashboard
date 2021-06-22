import {AFF_MODAL_MENU,CHANGE_MENU_DATA,LOADING_MENU} from './types';

export const affMenu = (payload)=>({
    type: AFF_MODAL_MENU,
    payload
});
export const changeMenu = (payload)=>({
    type: CHANGE_MENU_DATA,
    payload
});
export const loadingMenu = (payload)=>({
    type: LOADING_MENU,
    payload
});