import React from "react";
import { useState } from "react";
import "./SearchForm.css";

/**SearchForm 
 * 1. Search form will be used both in LawsuitList and CategoryList.
 * 2. 
 */

function SearchForm({ searchFor }){
    console.debug("SearchForm" , "searchFor=" , typeof searchFor);

    const [searchTerm , setSearchTerm] = useState("");

    //To filter
    function handleSubmit(evt){ //take care of accidentally searching for empty string
        evt.preventDefault(); //prevent default action of form submit
        searchFor(searchTerm.trim() || undefined); //trim(): remove white space from both ends of the string
        setSearchTerm(searchTerm.trim());
    }

    //Update form fields
    function handleChange(evt){
        setSearchTerm(evt.target.value);
    }

    return(
        <div className = "SearchForm mb-4" style={{maxWidth:'600px', marginLeft:'-20%'}}>
            <form className = "form-inline" onSubmit = { handleSubmit }>
                <input
                    className = "form-control form-control-lg flex-grow-1"
                    name = "searchTerm"
                    placeholder = "Enter search term"
                    value = {searchTerm}
                    onChange = { handleChange }
                />
                <button type="submit"  
                                       style={{backgroundColor:'#F0A500',
                                               height: '50px',
                                               fontSize: '25px',
                                               border: '#E8AA42 solid 2px',
                                               borderRadius: '5px',
                                               cursor: 'pointer',
                                               width: '25%',
                                               left: '20%',
                                               marginTop: '5%',
                                               }}>
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchForm;