import React from "react";
import { useContext } from "react";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'; 

/**Homepage of the site: Routed at "/"
 * 1. Displays a welcome message to the user
 * 2. Displays login and register buttons
 * 3. Shows a link to the profile page if the user is logged in
 * 4. Shows a link to the categories page if the user is logged in
 * 5. Shows link to lawsuit page if the user logged in 
 */

function Homepage(){
    const { currentUser } = useContext(UserContext);      //get the current user from context
                                                         //“useContext” hook is used to create common data that can be accessed throughout the 
                                                        //component hierarchy without passing the props down manually to each level. 
                                                       //Context defined will be available to all the child components without involving “props”.

    console.debug("Homepage", "currentUser=" , currentUser);

    return(
        <div className="Homepage">
            <div className = "container text-center">
                <div>
                
                </div>
                <h1 className = "mb-4 font-weight-bold" style={{color:'white' , fontSize:'500%'}}> 
                Global <img src = "https://theplayingfieldproject.org/wp-content/uploads/2020/11/Scale-4-1.gif" alt = "logo" 
                style={{width:"10%", height:"10%"}}/> Legal 
                </h1>
                <p className = "lead" style={{fontSize:'200%',color:'#fcf33f' ,margin:'2%'}}> Creative solutions for legal problems. </p>
                {currentUser ?  (<h2 style={{color:'grey'}}> Welcome back {currentUser.firstName || currentUser.username}!</h2>)
                             :  (<p>
                                    <Button className= "btn" variant="primary" size="lg" href = "/login" style={{
                                         height: '50px',
                                         backgroundColor: '#6d9f33',
                                         color: 'white',
                                         fontSize: '20px',
                                         border: 'none',
                                         borderRadius: '5px',
                                         cursor: 'pointer',
                                         width: '40%',
                                         left: '20%',
                                         margin: '10px',
                                         marginTop: '20px',
                                    }}> Login </Button>

                                    <Button className="btn" variant="primary" size="lg" href = "/register" style={{
                                          height: '50px',
                                          backgroundColor: '#4366a3',
                                          color: 'white',
                                          fontSize: '20px',
                                          border: 'none',
                                          borderRadius: '5px',
                                          cursor: 'pointer',
                                          width: '40%',
                                          left: '20%',
                                            margin: '10px',
                                            marginTop: '20px',
                                    }}> Register </Button>
                                 </p>)
                }
            </div>
            <Container>
            <Row>
            <Col>
            <div className="firstC">
                <img src="https://images.unsplash.com/photo-1428976343495-f2c66e701b2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="a.delonoix"/>
            </div>
            </Col>

            <Col>
                <div className="secondC">
                    <div style={{fontSize:'300%', color:'#ffc42a', margin:'10px' ,fontWeight:'bold'}}> Announcements   </div>
                        <ListGroup variant="flush" style={{margin:'10%' ,height:'100%' , fontSize:'large', backgroundColor:'black'}}>
                            <ListGroup.Item style={{backgroundColor:'black' , color:'#15bdbf' , fontSize:'xlarge'}}> 
                            <p style={{color:'#fcf33f' , fontSize:'xlarge'}}> August 22, 2022 </p>
                            <div> Global&Legal has a new Practice Division: Health Law Practices </div>
                            </ListGroup.Item>

                            <ListGroup.Item style={{backgroundColor:'black' , color:'#15bdbf' , fontSize:'xlarge'}} > 
                                <p style={{color:'#fcf33f' , fontSize:'xlarge'}}> August 15 , 2022</p>
                                <div> Please complete new employee forms before August 25,2022  </div>
                            </ListGroup.Item>

                            <ListGroup.Item  style={{backgroundColor:'black' , color:'#15bdbf' , fontSize:'xlarge'}}>
                                <p style={{color:'#fcf33f' , fontSize:'xlarge'}}> August 15 , 2022</p>
                                <div> Global&Legal privacy policy has been renewed. </div>   
                            </ListGroup.Item>

                            <ListGroup.Item style={{backgroundColor:'black' , color:'#15bdbf',fontSize:'xlarge'}}>
                                <p style={{color:'#fcf33f' , fontSize:'xlarge'}}> August 10, 2022 </p>
                                <div> New article from Global&Legal Attorney Jessica Brown: What technologies your lawfirm
                                    needs? <a href= "https://www.abajournal.com/">ABA Journal</a> </div> 
                            </ListGroup.Item>

                            <ListGroup.Item style={{backgroundColor:'black' , color:'#15bdbf', fontSize:'xlarge'}}>
                                <p style={{color:'#fcf33f', fontSize:'xlarge'}}> July 28, 2022 </p>
                                <div> USCIS : New STEM Resources Available on USCIS Website
                                U.S. Citizenship and Immigration Services has published additional online resources on uscis.gov to provide an overview of some of the
                                temporary and permanent pathways for noncitizens to work in the United States in the fields of science, technology,
                                engineering, and math (STEM).
                                <a href= "https://www.uscis.gov/newsroom/alerts/new-stem-resources-available-on-uscis-website"> USCIS </a>
                                </div>   
                            </ListGroup.Item>
                        </ListGroup>
                </div> 
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default Homepage;
