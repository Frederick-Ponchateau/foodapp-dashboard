import {CHANGE_COUNT,RESET_COUNT,AFFICHAGE} from '../actions/types';

const stateInit = {count :0 ,affHome: false};

const count = (state = stateInit,action) => {
   // console.log("action : ",state)
    switch (action.type) {
        case CHANGE_COUNT:
            return action.payload;
            break;
            case RESET_COUNT:
                return stateInit.count;
                break;
            case AFFICHAGE:
               
               
                return {...state,affHome:action.payload };
                 break;
        default:
            break;
    }
    return (
        state
    )
}

export default count
