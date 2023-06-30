
import React from 'react';
import { useState , useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import GlobalApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

//Key name for storing the token in localStorage for remember me re-login
export const TOKEN_STORAGE_ID = "global-token";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false); //infoLoaded is a boolean variable
    const [assignmentIds , setAssignmentIds] = useState(new Set([])); //assignmentIds is a set of assignmentIds
    const [currentUser , setCurrentUser] = useState(null); //currentUser is a user object
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID); //token is a string

    console.debug("App", "token=", token , "infoLoaded=", infoLoaded , "currentUser=", currentUser);


  // Load user info from API. Until a user is logged in and they have a token,
  //This should not run. It only needs to re-run when a user logs out, so
  //The value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo" , "token=", token);

    async function getCurrentUser(){ //get current user
      if(token){ //if token exists
        try{
          let { username } = jwt.decode(token); //decode token
          //put the token on the Api class so it can use it to call the API
          GlobalApi.token = token;
          let currentUser = await GlobalApi.getCurrentUser(username);   //get current user
          setCurrentUser(currentUser);
          setAssignmentIds(new Set(currentUser.assignments));   //set assignmentIds
        } catch(err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null); //set current user to null
        }
      }
      setInfoLoaded(true);
    }
     // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  } , [token]);

  //Handles site-wide logout
    
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  //Handles site-wide sigup. Automatically logs user in(set token) when register
  
  async function register(registerData){ //register data is an object
    try{
      let token = await GlobalApi.register(registerData); //register user
      setToken(token); //set token
      return { success : true }; //return success
    } catch (errors) {
      console.error("register failed" , errors);
      return { success : false, errors }; //return errors
    }
  }

  //Handles site-wide login. Automatically logs user in(set token) when login

  async function login (loginData){ //login data is an object
    try{
      console.log("loginData", loginData); //print login data
      let token = await GlobalApi.login(loginData); //login user
      setToken(token); //set token
      return { success : true };
    } catch(errors){
      console.error( "Login failed" ,errors); //print errors
      return { success : false, errors };
    }
  }

  //Checks if a lawsuit is assigned to any other user
    
  function hasAddedLawsuit(id){
    return assignmentIds.has(id);
  }

  //Adds a lawsuit to the user's list of assigned lawsuits
    
  function addLawsuit(id){
    if(hasAddedLawsuit(id)){
      return;
    }
    GlobalApi.addLawsuit(currentUser.username , id);
    setAssignmentIds(new Set([...assignmentIds , id]));
  }

  if(!infoLoaded) return <LoadingSpinner />;

  return(
    <BrowserRouter>
      <UserContext.Provider
            value={{ currentUser, setCurrentUser , hasAddedLawsuit , addLawsuit }}>
          <div className="App">
            <Navigation logout = { logout }/>
            <Routes login = {login} register = {register}/>
          </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
  

export default App;
