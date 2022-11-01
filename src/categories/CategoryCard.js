import React from "react";
import { Link } from "react-router-dom";

import "./CategoryCard.css";

/**Show information about a category as Criminal Law:...
 * CategoryCard will be renderd by CategoryList to show a card for each category.
 * CategoryList ----> CategoryCard
 */

function CategoryCard({ handle ,name, description }){ //handle is the handle of the category
    console.debug("CategoryCard" , handle); //debug
    
    return(
        <div className = "CategoryCard" to = {`/categories/${handle}`} style={{backgroundColor:'#C6DCE4',
                         margin:'3%', padding:'2%'}}> 
            <div className = "card-body">
                <h6 className = "card-title" style={{fontSize:'110%'}}>
                <Link to={`/categories/${handle}`}> { name } </Link> 
                </h6>
                <p style={{color:'#424243'}}><small> { description } </small></p>

            </div>
        </div>
    );
}

export default CategoryCard;