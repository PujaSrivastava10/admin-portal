import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getAdminsRequest} from '../../../actions'
class Admins extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false}
   }
  componentDidMount(){
    console.log('Admin');
      this.props.getAdminsRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps);
      if(nextProps.data.admin_data!==undefined){
        this.setState({data_present:true})
        console.log(nextProps.data.admin_data[0]);
      }

}

  render(){
    if(!(this.props.data.logStatus)){
      return(
      <Redirect to='/'/>)
    }else if((this.props.data.logStatus)&&(this.state.data_present)){
    return(
    <Row>
    <Col xl={{size:12}}>
    <NavbarDashboard />
    <Row>
    <Col sm={{size:2}}>
    <Sidebar />
    </Col>
    <Col sm={{size:8,offset:1}} className="canvasforDashboard">
    <Card className="cardForDashboard">
      <Row className="rowHead">
      <Col xs={{size:1}} className="colHead">S.No.</Col>
      <Col xs={{size:2}} className="colHead">Name</Col>
      <Col xs={{size:3}} className="colHead">Email ID</Col>
      <Col xs={{size:2}} className="colHead">Auth Level</Col>
      <Col xs={{size:2}} className="colHead">Added By</Col>
      <Col xs={{size:2}} className="colHead">Status</Col>
      </Row>
       {this.props.data.admin_data.map((value,key)=>
         <Row className="rowBody" key={key}>
             <Col xs={{size:1}} className="colBody">{key+1}.</Col>
             <Col xs={{size:2}} className="colBody">{value.name}</Col>
             <Col xs={{size:3}} className="colBody">{value.email_id}</Col>
             <Col xs={{size:2}} className="colBody">{value.auth_level}</Col>
             <Col xs={{size:2}} className="colBody">{value.added_by}</Col>
             <Col xs={{size:2}} className="colBody">{value.status}</Col>
           </Row>
        )}
    </Card>
    </Col>
    </Row>
    </Col>
    </Row>
  )}
  else{
    return(
      <div></div>
    )
  }
  }
}
function mapStateToProps(state){
  return{
    data:state
  }
}
export default connect(mapStateToProps,{getAdminsRequest})(Admins)
