import React from "react";
import { useState , useContext } from "react";
import GlobalApi from "../api/api"
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
//import useTimedMessage from "../hooks/useTimedMessage";

/**User profile form: for editing
 * 1. Routed at /profile
 * 2. User can edit their profile
 * 3. Displays profile form, handles changes and submits the form
 */

function ProfileForm(){
    const { currentUser , setCurrentUser } = useContext(UserContext);   //get current user from context
    const [formData , setFormData] = useState({
        username: currentUser.username,
        firstName : currentUser.firstName,
        lastName : currentUser.lastName,
        email : currentUser.email,
        password : "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const[saveConfirmed , setSaveConfirmed] = useState(false);
    //const [message , setMessage] = useTimedMessage();
    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );
    //on form submit: try to save in the backend and report any errors
    //if successful: clear previous error messages and password, show the confirmation message
    //and set current user data throughout the site

    async function handleSubmit(evt){
        evt.preventDefault();

        let profileData = {
            firstName : formData.firstName,
            lastName : formData.lastName,
            email : formData.email,
            password : formData.password,
            

        };
        let username = formData.username;
        let updatedUser;

        try{
            updatedUser = await GlobalApi.saveProfile(username , profileData);
        } catch(errors) {
            debugger;
            setFormErrors(errors);
            return;
        }
        setFormData(f => ({...f, password:"" }));
        setFormErrors([]);
        setSaveConfirmed(true);

        //trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
    }

    //on form change: update form data and clear previous error messages
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(f => ({...f, [name]:value}));
        setFormErrors([]);
    }

    return(
        <div className = "col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3 style={{color:'#CC704B', fontSize:'400%', textAlign:'center'}}> Profile </h3>
            <p style={{color:'grey' , fontSize:'120%'}}> Please let us know if there is a change in your profile information.</p>
            <div className = "card" style={{backgroundColor:'#F7CCAC' , fontSize:'145%' , maxWidth:'800px'}}>
                <div className = "card-body">
                    <form>
                        <div className = "form-group" style={{padding:'3%'}}>
                            <label style={{fontWeight:'bold', color:'#733C3C', fontSize:'150%'}}> Hello {formData.username}!</label>
                         
                        </div>

                        <div className = "form-group" style={{padding:'3%'}}>
                            <label> First Name </label>
                            <input 
                                name = "firstName"
                                className = "form-control"
                                value = {formData.firstName}
                                onChange = {handleChange}
                            />
                        </div>

                        <div className = "form-group" style={{padding:'3%'}}>
                            <label> Last Name </label>
                            <input
                                name = "lastName"
                                className = "form-control"
                                value = {formData.lastName}
                                onChange = {handleChange}
                            />
                        </div>

                        <div className = "form-group" style={{padding:'3%'}}>
                            <label> Email </label>
                            <input
                                name = "email"
                                className = "form-control"
                                value = {formData.email}
                                onChange = {handleChange}
                            />
                        </div>

                        <div className = "form-group" style={{padding:'3%'}}>
                            <label> Confirm password to make changes: </label>
                            <input
                                name = "password"
                                type = "password"
                                className = "form-control"
                                value = {formData.password}
                                onChange = {handleChange}
                            />
                        </div>

                        {formErrors.length
                            ? <Alert type = "danger" messages = {formErrors} />
                            : null
                        }
                        {saveConfirmed
                            ? <Alert type = "success" messages = {["Profile updated successfully"]} />
                            : null
                        }
                        <button style={{
                           
                            backgroundColor: '#733C3C',
                            color: 'white',
                            fontSize: '20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginLeft:'25%',
                            left: '20%',
                            margin: '10px',
                            marginTop: '20px',}}
                       
                            className = "btn btn-primary btn-block mt-4"
                            onClick = {handleSubmit}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
