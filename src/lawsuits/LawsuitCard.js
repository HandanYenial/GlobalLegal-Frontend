import React from 'react';
import {useContext , useState } from "react";
import "./LawsuitCard.css";
import UserContext from "../auth/UserContext";

/**Lawsuit Card Component
 * 1. Displays the lawsuit details
 * 2. LawsuitCardList will render the LawsuitCard component
 * 3. LawsuitCardList ----> LawsuitCard
*/

function LawsuitCard({id, title , description , comment , location , categoryName , created_at, updated_at}){
    console.debug("LawsuitCard");

    const{ hasAddedLawsuit , addLawsuit } = useContext(UserContext);
    const [isAdded , setIsAdded] = useState();

    React.useEffect(function updateAddedLawsuitStatus(){
        console.debug("LawsuitCard useEffect updateAddedLawsuitStatus" , "id=" , id);

        setIsAdded(hasAddedLawsuit(id));
    } , [id , hasAddedLawsuit]); //update the isAdded state when the id changes

    // Add a lawsuit to the user
    async function handleAddLawsuit(evt){
        if (hasAddedLawsuit(id)){
            return;
        }
        addLawsuit(id);
        setIsAdded(true);
    }

    return(
        <div className = "LawsuitCard card" style={{maxWidth:'900px' , margin:'5%', border:'#295E6A solid 2px', borderRadius:'5%', marginLeft:'20%'}}> { isAdded }
            <div className = "card-body" style={{backgroundColor:'#BFD8D5', border:'#295E6A solid 2px', borderRadius:'5%' }}>
                <h6 className = "card-title" style={{fontSize:'140%'}}> { title } </h6>
                <p> { categoryName } </p>
                {created_at && <p> Lawsuit created: {created_at} </p>}
                {updated_at && <p> Lawsuit updated: {updated_at} </p>}
                {description && <div><small> Description: { description }</small></div>}
                {location && <div><small> Location: { location }</small></div>}
                {comment && <div><small> Comment: { comment }</small></div>}
                <button
                    className= "btn" variant="primary" size="m" style={{
                            height: '50px',
                            backgroundColor: '#80A3A2',
                            color: '#295E6A',
                            fontSize: '20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '25%',
                            left: '20%',
                            margin: '10px',
                            marginTop: '20px',
                            }}
                       
                       onClick = { handleAddLawsuit }
                       disabled = { isAdded }
                >
                    { isAdded ? "Added" : "Add" }
                </button>
            </div>
        </div> 
    );
}

export default LawsuitCard;
