import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	//<a href="./demo.html">
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div>
					<div className="nav-item dropdown">
						<div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos
						</div>
						<ul className="dropdown-menu list-unstyled" aria-labelledby="navbarDropdown">
							{store.favoritos && store.favoritos.length > 0 ? <>
								{store.favoritos.map((item, index) => {
									return <Link key={index} to={item.link}>
										{item.name}
									</Link>
								})}
							</> : <></>}

						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};


/*

[{},{},{
	label:"",
	done:false
} ] 

[{},{},{
	name:"",
	uid:1,
	categoy:"people"
} ] 

*/