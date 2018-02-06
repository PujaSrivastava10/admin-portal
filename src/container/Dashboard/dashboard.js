import React,{Component} from 'react';
import {Row,Col} from 'reactstrap';
import NavbarDashboard from './navbarDashboard';
import {Redirect} from 'react-router'
//import {userLoginSuccess,logout} from '../../actions';
import {connect} from 'react-redux';


import Sidebar from './sidebar'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){
    //if(this.props.data.logStatus)
  }
  render(){
    console.log('Dashboard props',this.props);
    if(!(this.props.data.logStatus)){
      return(
      <Redirect to='/'/>)
    }else{
    return(
      <div>
      <NavbarDashboard />
      <Row>
      <Col sm={{size:2}}>
      <Sidebar />
      </Col>
      <Col sm={{size:9}} className="canvasforDashboard">
      <h1 style={{}}>
      Hey !!
      </h1>
      </Col>
      </Row>
      </div>
    );
  }}
}

function mapStateToProps(state){
  return {data:state}
}
export default connect(mapStateToProps)(Dashboard);
