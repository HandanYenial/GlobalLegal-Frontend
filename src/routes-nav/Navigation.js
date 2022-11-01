import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/**Navigation bar for the site:
 * 1. Navbar shows up in every page.
 * 2. Navbar has a toggle button to show/hide the menu.
 * 3. Navbar has a brand logo.
 * 4. If user is logged in, shows links to categories and lawsuits
 * 5. If user is not logged in, shows links to login and register
 * 6. Shows a welcome message when user is logged in.
 */

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation: currentUser: ", currentUser);

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto" style={{position:'relative', marginLeft:'30%', fontSize:'90%',
                justifyContent:'end'}}>
              <li className="nav-item mr-4" >
                <NavLink className="nav-link" to="/categories"> Practice </NavLink>
              </li>

              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/lawsuits"> Lawsuits </NavLink>
              </li>

              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile"> Profile </NavLink>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Logout {currentUser.first_name || currentUser.username}
                </Link>
              </li>
            </ul>
        );
      }
    
      function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto" style={{marginLeft:'30%'}}>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login"> Login </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/register"> Register </NavLink>
              </li>
            </ul>
        );
      }
    
      return (
          <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/" style={{fontSize:'xx-large', marginLeft:'3%',fontWeight:'bold'}}>
            <img src = "https://theplayingfieldproject.org/wp-content/uploads/2020/11/Scale-4-1.gif" alt = "logo" 
                style={{width:"5%" , height:"3%"}}/>
              Global & Legal
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
          </nav>
      );
    }

export default Navigation;