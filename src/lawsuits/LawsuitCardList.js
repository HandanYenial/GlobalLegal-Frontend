import React from "react";
import LawsuitCard from "./LawsuitCard";

/**LawsuitCard List:
 * 1. Show list of lawsuit cards
 * 2. LawsuitCard List will be used by both LawsuitList and CategoryDeatil.
 * 
 */

function LawsuitCardList({ lawsuits , add }){
    console.debug("LawsuitCardList" , "lawsuits=",lawsuits);

    return(
        <div className = "LawsuitCardList">
            { lawsuits.map(lawsuit => (
                          <LawsuitCard 
                                key = { lawsuit.id }
                                id = { lawsuit.id }
                                title = { lawsuit.title }
                                description = { lawsuit.description }
                                comment = { lawsuit.comment }
                                location = { lawsuit.location }
                                categoryName = { lawsuit.categoryName }
                                created_at = { lawsuit.created_at }
                                updated_at = { lawsuit.updated_at }
                            />
            ))}
        </div>
    );
}

export default LawsuitCardList;
