import React from "react";
import "./LoadingSpinner.css";

/*Loading spinner component to show loading spinner when the page is loading.
 * Specifically waiting for the data from Api.
*/

function LoadingSpinner(){
    return(
        <div className = "LoadingSpinner">
            
            <p>Loading...</p>
        </div>
    );
}

export default LoadingSpinner;