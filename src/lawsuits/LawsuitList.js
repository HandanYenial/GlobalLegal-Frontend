import React from "react";
import { useState , useEffect } from "react";
import SearchForm from "../common/SearchForm";
import GlobalApi from "../api/api";
import LawsuitCardList from "./LawsuitCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**Show page with list of lawsuits
 * Routed at /lawsuits
 */

function LawsuitList(){
    console.debug("LawsuitList");

    const [lawsuits , setLawsuits] = useState(null);

    useEffect(function getAllLawsuitsOnMount(){//useEffect: is used for changing the state of the component
        console.debug("LawsuitList useEffect getAllLawsuitsOnMount");
        search();
    }, []);

    //Triggered by search form submit; reloads lawsuits;
    async function search(title){
        let lawsuits = await GlobalApi.getLawsuits(title);
        setLawsuits(lawsuits);
    }

    if(!lawsuits){
        return <LoadingSpinner />;
    }
    return(
        <div>
           
            <div>
            <h3 style={{color:'#4FD3C4', fontSize:'400%', textAlign:'center', margin:'3%',}}
           >
            Global& Legal Lawsuits</h3>
            </div>
        <div className = "LawsuitList col-md-8 offset-md-2" >
           
            <p style={{marginLeft:'-20%' , color:'#F0A500' ,fontSize:'150%'}}> Which lawsuits are you looking for?</p>
            <SearchForm searchFor = { search }/>
            { lawsuits.length
                ? <LawsuitCardList lawsuits = { lawsuits }/>
                : <p className = "lead"> No results were found</p>
            }
        
        </div>
    </div>
    );
}

export default LawsuitList;