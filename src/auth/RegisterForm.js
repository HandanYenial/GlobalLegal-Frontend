import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Alert from '../common/Alert';
import './RegisterForm.css';

/**register form for new user
 * 1. Show the register form(username, password,firstname,lastname,email)
 * 2. Handle the register form submission
 * 3. Redirect to categories page if register is successful
 */

function RegisterForm({ register }) {
    const history = useHistory();    //useHistory is a react hook that is used to navigate to different pages.
    const [formData , setFormData] = useState({username:"" ,
                                               password:"", 
                                               firstName:"", 
                                               lastName:"", 
                                               email:""});   //useState is a react hook that is used to manage the state of the component.Username, password, firstname, lastname, email fields will be empty initially.
   
    const [formErrors, setFormErrors] = useState([]);    //error messages array will be empty initially. and we will push the error messages to this array.

    console.debug("RegisterForm",
                  "register=" , typeof register,
                  "formData=", formData,
                  "formErrors=", formErrors);

    //handle form submission. when user submits the form, this function will be called.
    
    async function handleSubmit(evt){
        evt.preventDefault(); //It prevents a link from following the URL so that the browser can't go another page
        let result = await register(formData); //call the register function and wait for the result.
        if (result.success){
            history.push("/categories"); //if the register is successful, redirect to the categories page.
        } else {
            setFormErrors(result.errors); //if the register is not successful, set the form errors to the result.errors array.
        }
    }

    //handle form change. when user changes the value of the form, this function will be called.
    
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(form => ({ ...form, [name]: value})); //set the form data to the form data with the new value.
    }

    //render the register form.
  return (
    <div className="RegisterForm">
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4" >
     
      <h2 className="mb-3" style = {{alignItems:'center' , textAlign:'center',fontSize:'300%',marginTop:'20%', color:'#ffc42a',}}> Create An Account </h2>
      <h3 style={{color:'grey', marginTop:'5%', fontSize:'190%'}}>Welcome to Global & Legal Lawfirm </h3>
      <p style={{color:'grey', fontSize:'110%'}}>Please fill in the registration form with your Global&Legal email address assigned by HR department.</p>
      <div className="card" style= {{fontSize:'150%' , padding:'20px', maxWidth:'800px', justifySelf:'center', alignItems:'center',marginTop:'10%',
                                    backgroundImage:'url(https://img.freepik.com/free-photo/gray-grunge-surface-wall-texture-background_1017-18216.jpg?w=2000)',
                                    boxShadow:'10px 10px 7px #7a7a7b'}}>
        <div className="card-body" style = {{color:'#0901f4', fontSize:'100%',  }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input style={{fontSize:'100%'}}
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input style={{fontSize:'100%'}}
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>First name</label>
              <input style={{fontSize:'100%'}}
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input style={{fontSize:'100%'}}
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input style={{fontSize:'100%'}}
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
              />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
            }

            <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
                style={{
                justifyContent:'center',
                height: '20%',
                backgroundColor: '#4366a3',
                fontSize: '100%',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width:'100%',
                
                marginTop: '50px',
                color:'#ffc42a'}}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>


);
}

export default RegisterForm;
