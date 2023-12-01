export const initialState = {
    usuario: {
        displayName: "",
        lastName: "",
        username: "",
        email: "",
    },
    autenticado: false,
};

export const sessionUsuarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USUARIO":
            return {
                ...state,
                usuario: action.sesion,
                autenticado: action.autenticado
            }
        case "LOGOUT_USUARIO":
            return {
                ...state,
                usuario: action.nuevoUsuario,
                autenticado: action.autenticado
            }
        case "ACTUALIZAR_USUARIO":
                return {
                    ...state,
                    usuario: action.nuevoUsuario,
                    autenticado: action.autenticado
                }
        default:
            return state;
    }
}

export const mainReducer = ( {sesionUsuarioReducer} , action) => {

    return {
        sesionUsuario: sessionUsuarioReducer(sesionUsuarioReducer, action)
    }
}