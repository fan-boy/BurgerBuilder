import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../Utilities/utility'; 

const initialState = {
    idToken: null,
    userId:null,
    email: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    redirectPath:'/'
}

const authSuccess = (state,action) =>{
    return updateObject(state,
        { 
                idToken: action.token,
                userId: action.user,
                email: action.email,
                error: 'false',
                loading: false,
                isLoggedIn: true,
               
        });
}
const authStart = (state,action) => {
    return updateObject(state,{error: 'false' , loading: true});
}

const authFail = (state,action) => {
    return updateObject(state,{error: action.error , loading: false});
}

const authLogout = (state,action) => {
    return updateObject(state,
        {
                idToken: null,
                userId: null,
                email: null,
                isLoggedIn: false
        })
}

const setRedirectPath = (state,action) => {
    return updateObject(state,{redirectPath: action.path});
}
const reducer = (state = initialState,action) => {
    
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        case actionTypes.LOGOUT:
            return authLogout(state,action);
        case actionTypes.SET_REDIRECT_PATH:
            return setRedirectPath(state,action);        
        default:
        return state;    
        
    }
}
export default reducer;