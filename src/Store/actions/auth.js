import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart =() =>{
    return{
        type : actionTypes.AUTH_START
    }
} 

export const authSuccess =(tokenId,localId,emailId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: tokenId,
        user: localId,
        email: emailId

    }
}

export const authFailed =(error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('expirationDate');
    return{
        type: actionTypes.LOGOUT
    }
}

export const checkTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        },expirationTime * 1000)
    };
}

export const setRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_REDIRECT_PATH,
        path: path
    }
}

export const auth = (email,password,method) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url ='';
        if (method==='SIGNUP'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAjGfu8rs8ihtjDKYiSeZIzMCgH1t-qtv4';
        }else if (method === 'SIGNIN'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAjGfu8rs8ihtjDKYiSeZIzMCgH1t-qtv4';
        }
        axios.post(url,authData)
        .then(response => {
            console.log(response.data);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('localId',response.data.localId);
            localStorage.setItem('emailId',response.data.email);
            dispatch(authSuccess(response.data.idToken,response.data.localId,response.data.email));
            dispatch(checkTimeout(response.data.expiresIn))
        })
        .catch(err =>{
            dispatch(authFailed(err.response.data.error));
        })
    };
}
export const  authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('authToken');
        if(!token){
            dispatch(logout());    
        }
        const expirationTime = new Date(localStorage.getItem('expirationDate'));
        const localId = localStorage.getItem('localId');
        const emailId = localStorage.getItem('emailId');
        if(expirationTime > new Date()){
            dispatch(authSuccess(token,localId,emailId))
        }else{
        dispatch(logout())
        }
    }
}