import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import GlobalApi from "../api/api";
import CategoryCard from "./CategoryCard";
import LoadingSpinner from "../common/LoadingSpinner";


/** Show page with a list of companies.
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from the search form.
 * This is routed to at /companies
 * Routes --- { CompanyCard, SearchForm }
 */

function CategoryList() {         //list of categories
  console.debug("CategoryList"); //debugging

  const [categories, setCategories] = useState(null); 

  useEffect(function getCategoriesOnMount() { 
    console.debug("CategoryList useEffect getCategoriesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads categories. */
  
  async function search(name) {        //search for categories by name
    let categories = await GlobalApi.getCategories(name);    //get categories from api
    setCategories(categories);   //set categories
  }

  if (!categories) return <LoadingSpinner />;

  return (
    <div style={{backgroundImage:'url(https://www.lawyersweekly.com.au/images/articleImages-850x492/technology-law-lw.jpg)' ,backgroundRepeat:'no-repeat'}}>
      <div className="CategoryList col-md-8 offset-md-2" >
        <SearchForm searchFor={search} />
        <div style={{color:'white', fontSize:'400%', textAlign:'center', margin:'3%', fontWeight:'bold'}}>
           Global & Legal Practice Areas
        </div>
        {categories.length
            ? (
                <div className="CategoryList-list" 
                style={{ marginBottom: "1rem", color: "white", fontSize:'125%', }}>
                  {categories.map(c => (
                      <CategoryCard
                          key={c.handle}
                          name={c.name}
                          handle={c.handle}
                          numEmployees = {c.numEmployees}
                          description = {c.description}    
                      />   
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
          
      </div>
    </div>
  );
}

export default CategoryList;
