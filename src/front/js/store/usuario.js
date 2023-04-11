export const usuarioStore = {
    listaUsuarios: [],
    usuario: {
        msg: "I'm an object"
    },
    user: "",
    userLogin: false

}

export function usuarioActions(getStore, getActions, setStore) {
    return {
        login: async (email, password) => {
            const store = getStore()
            const actions = getActions()
            console.log("Es la encargada de hacer login del usuario", email, password)
            let obj = {
                email: email,
                password: password
            }

            let { respuestaJson, response } = await actions.useFetch("/login", obj, "POST")
            console.log(response.ok)
            console.log(respuestaJson)
            if (response.ok) {
                localStorage.setItem("token", respuestaJson.token)
                sessionStorage.setItem("token", respuestaJson.token)
                let token = localStorage.getItem("token")
                setStore({ ...store, userLogin: true })
                //console.log("token", token)
            } else {
                console.log("login fallido")
                localStorage.setItem("token", "")
                sessionStorage.setItem("token", "")
                setStore({ ...store, userLogin: false })
            }


            /* setStore({
                ...store, usuario: {
                    msg: "Usuario logueado"
                }
            }) */

            return store.usuario;
        },
        userToDo: (nuevoUser) => { //esta función se encargará de cambiar el estado centralizado 'user'
            const store = getStore()
            setStore({ ...store, user: nuevoUser })
        }
    }
}