export const todoStore = {
    todoList: [],
    todo: {
        label: "",
        done: false
    }

}

export function todoActions(getStore, getActions, setStore) {
    return {
        getToDoList: async () => {//esta función obtendrá la lista de todos
            //Como necesito usar el useFetch que es una action, debo traermela con getAction()
            let actions = getActions()

            //De igual manera como necesito usar el estado todoList y el estado user, debo traerme el store
            let store = getStore()

            let { respuestaJson, response } = await actions.useFetch(`/todos/user/${store.user}`)
            if (response.ok) {
                setStore({ ...store, todoList: respuestaJson })
            }
            return;
        },
        eliminarToDo: async (i) => {//recibo el índice como i
            let actions = getActions()
            let store = getStore()

            let arrTemp = store.todoList.filter((item, index) => { return index != i })

            //Ahora envío la petición con la lista de To Do modificada, y espero la respuesta del servidor
            let { respuestaJson, response } = await actions.useFetch(`/todos/user/${store.user}`, arrTemp, "PUT")

            if (response.ok) {//Si la respuesta es positiva entonces se modificó en el backend
                console.log(response)
                setStore({ ...store, todoList: arrTemp }) //reenderizando el componente con lo que está efectivamente en backend
            } else {
                alert("No se actualizó o no hubo conexión con la API")
            }

        },
        agregarToDo: async (tarea) => {
            let actions = getActions()
            let store = getStore()

            let todoObj = {
                label: tarea,
                done: false
            }
            //Ahora envío la petición con la lista de To Do, y espero la respuesta del servidor
            let arrTemp = [...store.todoList, todoObj]
            //pero dependerá de si existe ya el usuario creado:
            let { respuestaJson, response } = await actions.useFetch(`/todos/user/${store.user}`, arrTemp, "PUT")


            if (response.ok) {//Si la respuesta es positiva entonces se modificó en el backend
                console.log(response)
                return true //puedo devolver true si fue correcto
            } else {
                alert("No se agregó o no hubo conexión con la API")
                return false
            }
        }
    }
}

//recordar importar en el Flux tanto todoStore como todoActions