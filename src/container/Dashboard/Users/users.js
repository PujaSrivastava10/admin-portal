import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getUsersRequest} from '../../../actions'
class Users extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,modal: false,userKey:''}
   }
  componentDidMount(){
    console.log('USERS');
    console.log('auth_token',this.props.data.auth_token);
      this.props.getUsersRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps);
      if(nextProps.data.user_data!==undefined){
        this.setState({data_present:true})
        console.log(nextProps.data.user_data[0]);
      }

}
toggle=()=>{
    this.setState({
      modal: !this.state.modal
    });
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
      <Col xs={{size:2}} className="colHead">First Name</Col>
      <Col xs={{size:2}} className="colHead">Last Name</Col>
      <Col xs={{size:3}} className="colHead">Email ID</Col>
      <Col xs={{size:2}} className="colHead">Plan</Col>
      <Col xs={{size:2}} className="colHead">Status</Col>
      </Row >
       {this.props.data.user_data.map((value,key)=>
         <div key={key} onClick={()=>{
                                  this.setState({
                                    modal:!(this.state.modal),
                                    userKey:key})}}>
         <Row  className="rowBody" key={key}>
             <Col xs={{size:1}} className="colBody">{key+1}.</Col>
             <Col xs={{size:2}} className="colBody">{value.first_name}</Col>
             <Col xs={{size:2}} className="colBody">{value.last_name}</Col>
             <Col xs={{size:3}} className="colBody">{value.email_id}</Col>
             <Col xs={{size:2}} className="colBody">{value.plan}</Col>
             <Col xs={{size:2}} className="colBody">{value.status}</Col>
           </Row >
           <Modal className="showModal" isOpen={this.state.modal&&(this.state.userKey===key)}>
           <ModalHeader className="colHead">{"User Information"}</ModalHeader>
           <ModalBody>
           <Row  className="rowBody">
               <Col className="colHead" sm={{size:3}}>First Name</Col>
               <Col className="colBody" sm={{size:8}}>{value.first_name}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Last Name</Col>
               <Col className="colBody" sm={{size:8}}>{value.last_name}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Email Id</Col>
               <Col className="colBody" sm={{size:8}}>{value.email_id}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Plan</Col>
               <Col className="colBody" sm={{size:8}}>{value.plan}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Invoice Number</Col>
               <Col className="colBody" sm={{size:8}}>{value.invoice_number}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Expiry Date</Col>
               <Col className="colBody" sm={{size:8}}>{value.expiry_date}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Status</Col>
               <Col className="colBody" sm={{size:8}}>{value.status}</Col>
           </Row>
           </ModalBody>
           <ModalFooter>
             <Button className="btn-modal" onClick={this.toggle}>Cancel</Button>
           </ModalFooter>
         </Modal>
         </div>
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
export default connect(mapStateToProps,{getUsersRequest})(Users)
