import React from "react";
import { useContext } from "react";
import { Route , Redirect } from "react-router-dom";
import UserContext  from "../auth/UserContext";

/**PrivateRoute:
 * 1. PrivateRoute is a Route component that only renders its children if the user is logged in.
 * 2. PrivateRoute redirects to the login page if the user is not logged in.
 * 3. PrivateRoute is used in the App component.
 */

function PrivateRoute({ exact , path , children }){
    const { currentUser } = useContext(UserContext);
    console.log("currentUser", currentUser);

    console.log("PrivateRoute" , 
                  "exact=", exact,
                  "path=", path,
                  "currentUser=" , currentUser,);
    if(!currentUser){
        return <Redirect to = "/login" />
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );   
}

export default PrivateRoute;