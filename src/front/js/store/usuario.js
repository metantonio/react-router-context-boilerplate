export const usuarioStore = {
    listaUsuarios: [],
    usuario: {
        msg: "I'm an object"
    },
    user: ""

}

export function usuarioActions(getStore, getActions, setStore) {
    return {
        login: async () => {
            const store = getStore()
            console.log("Es la encargada de hacer login del usuario")

            setStore({
                ...store, usuario: {
                    msg: "Usuario logueado"
                }
            })

            return store.usuario;
        },
        userToDo: (nuevoUser) => { //esta función se encargará de cambiar el estado centralizado 'user'
            const store = getStore()
            setStore({ ...store, user: nuevoUser })
        }
    }
}