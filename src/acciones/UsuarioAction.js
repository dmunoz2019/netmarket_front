import HttpCliente from '../servicios/HttpClient';
import axios from 'axios';


export const registrarUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/api/user/register', usuario).then(response => {
            
            dispatch({
                type: "LOGIN_USUARIO",
                sesion: response.data,
                autenticado: true
            })
            
            resolve(response);
        })
        .catch(error => {
            resolve(error.response);
        });
    });
}
export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/api/user/login', usuario).then(response => {
            
            dispatch({
                type: "LOGIN_USUARIO",
                sesion: response.data,
                autenticado: true
            })


            resolve(response);
        })
        .catch(error => {
            resolve(error.response);
        });
    });
}

export const getUsuario = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/api/user').then(response => {

            dispatch({
                type: "LOGIN_USUARIO",
                sesion: response.data,
                autenticado: true
            })
            

            resolve(response);
        })
        .catch(error => {
            resolve(error.response);
        });
    });
}