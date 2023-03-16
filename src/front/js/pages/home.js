import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {//Esta es la versión con estados dentro del componente
	const { store, actions } = useContext(Context);
	const [todos, setTodos] = useState([]); 	//[{},{},{}] estructura de la lista de tareas
	const [user, setUser] = useState("") // es el nombre del usuario propetario de la lista de To Do

	useEffect(() => {
		//creamos una función asíncrona que traerá la información de la lista de To Do
		const cargaDeDatos = async () => {
			let { respuestaJson, response } = await actions.useFetch(`/todos/user/${user}`)
			if (response.ok) {
				setTodos(respuestaJson)
			}
		}
		cargaDeDatos() //No olvidemos llamar a la función para que se ejecute

	}, [user]) //El componente se renderizará la primera vez y cada vez que el estado user cambie

	useEffect(() => { console.log(todos) }, [todos])
	//useEffect(() => { console.log(user) }, [user])

	const eliminar = async (i) => {//Función para eliminar
		let arrTemp = todos.filter((item, index) => { return index != i })

		//Ahora envío la petición con la lista de To Do modificada, y espero la respuesta del servidor
		let { respuestaJson, response } = await actions.useFetch(`/todos/user/${user}`, arrTemp, "PUT")

		if (response.ok) {//Si la respuesta es positiva entonces se modificó en el backend
			console.log(response)
			setTodos(arrTemp) //reenderizando el componente con lo que está efectivamente en backend
		} else {
			alert("No se actualizó o no hubo conexión con la API")
		}

	}


	return (
		<div className="text-center mt-5">
			Lista de Tareas
			<br />
			<input placeholder="username" onChange={(e) => { setUser(e.target.value) }}></input>
			<br></br>
			<input placeholder="agrear nueva tarea a la lista" onChange={(e) => { }}></input>
			<br />
			{todos && todos.length > 0 ? //Verifico el estado
				<ol>{todos.map((item, index) => { //Hago un map del estado y muestro los to do si existen
					return <li key={index}>
						{item.label}
						<button type="button"    //Agrego un botón para eliminar el todo
							onClick={() => {
								eliminar(index)	//este botón ejecuta esta acción y le pasamos el índice
							}}>
							Eliminar
						</button>
					</li>
				})}</ol>
				:
				<>No hay tareas por hacer</>
			}
		</div>
	);
};
