import React from "react";

/**Alert component to show bootstrap-style alerts
 * Used in
 * 1.LoginForm
 * 2.RegisterForm
 */

function Alert({ type = "danger" , messages = []}){
    console.debug("Alert", 
                  "type=", type,
                  "messages=", messages);
    
    return(
        <div className = {`alert alert-${type}`} role = "alert">
            {messages.map(error =>(
                <p className = "mb-0 small" key = {error} > {error} </p>
            ))}
        </div>
    );
}

export default Alert;