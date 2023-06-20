import React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import  Alert  from "../common/Alert";
import UserContext from "../auth/UserContext";
import "./LoginForm.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

/**Login form for user login:
 * 1. Show the log in form.
 * 2. Handle form submission.
 * 3. Show the login error message.
 * 4. Show the login success message.
 * 5. Redirect to the categories page if the login is successful.
 */

 function LoginForm({ login }){ 
    const history = useHistory();     //useHistory is a react hook that is used to navigate to different pages.
    const [formData , setFormData] = useState({ username:"" , password:"" });      //useState is a react hook that is used to manage 
                                                                                  //the state of the component.username and password fields will be empty initially.
    const [formErrors, setFormErrors] = useState([]);           //error messages array will be empty initially.and we will push the error messages to this array.
    const { setCurrentUser } = useContext(UserContext);        //get current user from context
   
    //console.debug is a function that is used to debug the code.
    console.debug("Loginform",
                  "login=" , typeof login,
                  "formData=", formData,
                  "formErrors=", formErrors);

    //handle form submission. when a user submits the form, this function will be called.
   
    async function handleSubmit(evt){
      console.log("handleSubmit");
        evt.preventDefault();            //It prevents a link from following the URL so that the browser can't go another page
        let result = await login(formData); //call the login function and wait for the result.
        if (result.success){
          setCurrentUser({username:formData.username, password: formData.password});
            history.push("/categories"); //if the login is successful, redirect to the categories page.
        } else {
            setFormErrors(result.errors);        //if the login is not successful, set the form errors to the result.errors array.
        }
    }

    //handle form change. when the user changes the value of the form, this function will be called.
   
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(form => ({ ...form, [name]: value})); //set the form data to the form data with the new value.
    }

    //render the login form.
  return (
    <MDBContainer fluid style={{padding:'5%' ,backgroundImage:'linear-gradient(black,#424243)'}}>
      <MDBRow>
        <MDBCol sm='6'>
         
        <div className='d-flex flex-row ps-5 pt-5' >
        <img src = "https://theplayingfieldproject.org/wp-content/uploads/2020/11/Scale-4-1.gif" alt = "logo" 
                style={{width:"30%" , height:"25%", marginLeft:'30%'}}/>
        </div>

        <div className="h1 fw-bold" style={{padding:'2rem', textAlign:'center', fontWeight:'bold', fontSize:'450%',color:'white'}}>
                Global & Legal
                <div> LawFirm </div>
        </div>

        <div className='d-flex flex-column h-custom-2 w-75 pt-2' >
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px' , color:'#ffc42a', fontSize:'180%', alignItems:'center'}}>Please login to your account.</h3>
              {/* <form onSubmit={handleSubmit}> */}
              <div style = {{color:'#ffc42a' , fontSize:'120%'}}>
                <div style={{marginLeft:'10%', fontSize:'xlarge'}}> Username </div>
                <MDBInput wrapperClass='mb-4 mx-5 w-100'  
                                                name='username'
                                                value={formData.username}
                                                onChange={handleChange}
                                                autoComplete='username'
                                                required
                                                id='username' 
                                                type='text' 
                                                size="xl"
                                                style={{ fontSize:'150%'}}/>
                                                
                <div style= {{marginLeft:'10%', fontSize:'xlarge'}}> Password </div>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' style={{ fontSize:'150%'}}
                                                
                                                name='password'
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete='current-password'
                                                required
                                                id='password' 
                                                type='password' 
                                                size="xl"
                                                />
              </div>

                <MDBBtn className="mb-4 px-5 mx-5 w-100"
                                            style={{backgroundColor:'#6d9f33', color:'white', border:'solid #6d9f33 2px', fontSize:'150%'}}
                                            onClick={handleSubmit}
                                            size='lg'> Login </MDBBtn>
            
                <p className='ms-5' style={{color:'#4366a3', fontSize:'120%'}}>Don't have an account? <a href="/register" className="link-info" style={{color:'#4366a3', fontSize:'100%'}}>Register here</a></p> 
           
          </div>
                {formErrors.length
                                ? <Alert type ="danger" messages = {formErrors} />
                                : null
                            } 
          {/* </form> */}
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="unsplash" className="w-100" style={{objectFit: 'cover', border:'solid black 2px',objectPosition: 'left', marginTop:'10%', borderRadius:'10%'}} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
