import React,{Component} from 'react';
import{Navbar,NavbarBrand,Nav,NavItem} from 'reactstrap';
import { NavLink} from 'react-router-dom'
export default class NavbarLoginSignUp extends Component {
  constructor(props) {
    super(props);
  }

render(){
  return(
  <Navbar className="navbar" expand="xs">
  <NavLink className="navBrand" exact to="/">Admin-Portal</NavLink>
  <Nav className="ml-auto" navbar>
  <NavLink className="navItems" activeClassName="activenavItems"  exact to="/">Login</NavLink>
  <NavLink className="navItems" activeClassName="activenavItems"  exact to="/Signup">Signup</NavLink>
  </Nav>
  </Navbar>
    )
  }

}
