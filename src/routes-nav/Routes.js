import React from "react";
import { Switch , Route , Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CategoryList from "../categories/CategoryList";
import CategoryDetail from "../categories/CategoryDetail";
import LawsuitList from "../lawsuits/LawsuitList";
import LawsuitDetail from "../lawsuits/LawsuitCard";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

/**Site-wide routes
 * 
 */
function Routes({ login, register }){
    console.debug("Routes" , `login=${typeof login}`, `register=${typeof register}`);

    return(
        <div className = "pt-5">
            <Switch>
                <Route exact path = "/">
                    <Homepage/>
                </Route>

                <Route exact path= "/login">
                    <LoginForm login = {login}/>
                </Route>

                <Route exact path= "/register">
                    <RegisterForm register = {register}/>
                </Route>

                <PrivateRoute exact path = "/categories">
                    <CategoryList/>
                </PrivateRoute>

                <PrivateRoute exact path = "/categories/:handle">
                    <CategoryDetail/>
                </PrivateRoute>

                <PrivateRoute exact path = "/lawsuits">
                    <LawsuitList/>
                </PrivateRoute>

                <PrivateRoute exact path = "/lawsuits/:id">
                    <LawsuitDetail/>
                </PrivateRoute>

                <PrivateRoute exact path = "/profile">
                    <ProfileForm/>
                </PrivateRoute>

                <Redirect to= "/"/>
            </Switch>
        </div>
    );
}

export default Routes;