
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {doLogout, getCurrentUserDetails, isLoggedIn} from '../auth'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
  

const CustomNavbar =()=>{

    let navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [login,setLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(()=>{


        setLogin(isLoggedIn())
        setUser(getCurrentUserDetails())

    },[login])


    const logout =()=>{
      doLogout(()=>{
         // logged out
         setLogin(false)
         navigate("/")
      })
    }

    return(
        <div>
            <Navbar color="dark"
                dark
                expand="md"
                fixed=""
                className='px-5'
                
                >
                <NavbarBrand tag={ReactLink} to="/">My Social Media App</NavbarBrand>  
                {/* <NavbarBrand tag={ReactLink} to="/">Home</NavbarBrand> */}
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink tag={ReactLink} to="/about">About</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={ReactLink} to="/services">Services</NavLink>
                    </NavItem>
                    
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        More
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>Contact Us</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>YouTube</DropdownItem>
                        <DropdownItem>Github</DropdownItem>
                        <DropdownItem>LinkedIn</DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Nav navbar>

                    {
                       login && (
                      <>
                      

                            <NavItem>
                              <NavLink tag={ReactLink} to="/user/profile-info" >
                                Profile Info
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink tag={ReactLink} to="/user/dashboard">
                                {user.email}
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink onClick={logout}>
                                Logout
                              </NavLink>
                            </NavItem>
                            
                      
                      </>  
                       
                       ) 
                    }


                    {
                        !login && (

                            <>
                              
                              <NavItem>
                                <NavLink tag={ReactLink} to="/login">
                                Login
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
                              </NavItem>
                            
                            
                            
                            </>
                        )
                    }
                    
                    
                </Nav>

                </Collapse>
            </Navbar>
    </div>
    )
}
export default CustomNavbar;