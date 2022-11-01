import React from "react";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";

import GlobalApi from "../api/api";
import LawsuitCardList from "../lawsuits/LawsuitCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**1.Show deatils of a Category
 * 2. CategoryDetail will be rendered by CategoryList to show a card for each Category.
 * 3. CategoryCard ---> CategoryDetail ---> CategoryCardList
 * 4. CategoryDetail renders LoadingSpinner while data is loading.
 * 5. CategoryDetail renders error message if there is an error.
 */

function CategoryDetail(){
    const { handle } = useParams(); //handle is the handle of the category
    console.debug("CategoryDetail" , "handle=" , handle);

    const [category , setCategory] = useState(null); //initial state of category is null
    useEffect(
        function getCategoryAndLawsuitsForUser(){
            async function getCategory(){
                setCategory(await GlobalApi.getCategory(handle));
            }
            getCategory();
        } , [handle] //only run getCategoryAndLawsuitsForUser when handle changes
    );
    if(!category){
        return <LoadingSpinner />;
    }

    return(
        <div className = "CategoryDetail col-md-8 offset-md-2">
            <h4 style={{color:'#2b97bc', fontSize:'200%'}}> { category.name } </h4>
            <p style={{color:'#adadad', fontSize:'120%'}}> { category.description } </p>
            <LawsuitCardList lawsuits = { category.lawsuits } />
        </div>
    );
}

export default CategoryDetail;