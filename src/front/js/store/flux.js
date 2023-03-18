import { exampleStore, exampleActions } from "./exampleStore.js"; //destructured import
import { usuarioStore, usuarioActions } from "./usuario.js";
import { todoStore, todoActions } from "./todos.js";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			...exampleStore, //this brings here the variables exampleArray and exampleObject
			...usuarioStore,
			...todoStore,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				//setStore({ demo: demo });

				//reset state demo only
				setStore({ ...store, demo: demo })
			},
			...exampleActions(getStore, getActions, setStore), //this will brings here the function exampleFunction, and it will be able to use store's states and actions
			...usuarioActions(getStore, getActions, setStore),
			...todoActions(getStore, getActions, setStore),
			useFetch: async (endpoint, body, method = "GET") => {
				let url = process.env.BACKEND_URL + endpoint
				console.log(url)
				let response = await fetch(url, {
					method: method,
					headers: { "Content-Type": "application/json" },
					body: body ? JSON.stringify(body) : null
				})

				let respuestaJson = await response.json()

				return { respuestaJson, response }

			},
			useFetchParalelo: (endpoint, body, method = "GET") => {
				let url = process.env.BACKEND_URL + endpoint
				console.log(url)
				let response = fetch(url, {
					method: method,
					headers: { "Content-Type": "application/json" },
					body: body ? JSON.stringify(body) : null
				})

				return response;
			},
		}
	};
};

export default getState;
