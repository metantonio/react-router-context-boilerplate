import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom"; //v.6.3.0, para versiones viejas sería <Redirect/>


const WithAuth = (Component) => { //HOC
    const AuthRoute = () => {
        const { store, actions } = useContext(Context);


        const isAuth = store.userLogin;
        if (isAuth) {
            return <Component />;
        } else {
            return <Navigate to="/login" />;
        }
    };

    return AuthRoute;
};
export default WithAuth