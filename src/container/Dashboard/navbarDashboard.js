import React,{Component} from 'react';
import{Navbar,NavbarBrand,Nav,NavItem,Button,NavLink as Navi,Row,Col} from 'reactstrap';
import { NavLink} from 'react-router-dom'
import {adminLogoutRequest} from '../../actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

class NavbarDashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      logout:false
    }
  }

 logout=()=>{
   alert('logout')
  //let logStatus=true;
  console.log(this.props.data);
   this.props.adminLogoutRequest(this.props.data.auth_token,this.props.data.user_id);

   //this.setState({logout:true})
  }
 componentWillReceiveProps(nextProps){
   // if(this.props.data===null){
   //   console.log('nextProps',nextProps.data);
   //   this.setState({logout:true})
   // }
 }
render(){

  return(
  <Row>
  <Col sm={{size:12}}>
  <nav className="navbar navbar-default navbar-fixed-top" expand="xs">
  <NavLink className="navBrand" exact to="/dashboard">Admin-Portal</NavLink>
  <NavLink className="navItems" activeClassName="activenavItems" exact to="/dashboard">Home</NavLink>
  <Nav className="ml-auto" navbar>
  <Navi className="navItems" activeClassName="activenavItems"  onClick={this.logout}>Logout</Navi>
  </Nav>
  </nav>
  </Col>
  </Row>
)}

}
function mapStateToProps(state){
  return {data:state}
}
export default connect(mapStateToProps,{adminLogoutRequest})(NavbarDashboard);
