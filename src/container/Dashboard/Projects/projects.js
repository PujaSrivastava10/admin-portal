import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getProjectsRequest} from '../../../actions'
import AddNewProject from './AddNewProject';
import ShowProjectDetails from './ShowProjectDetails';
class Projects extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,modal: false,projectKey:'' , modalAdd:false}
   }
  componentDidMount(){
      console.log('auth_token',this.props.data.auth_token);
      this.props.getProjectsRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps);
      if(nextProps.data.project_data!==undefined){
        this.setState({data_present:true})
        console.log(nextProps.data.project_data[0]);
      }
    }
    toggle=()=>{
        this.setState({
          modal: !this.state.modal
        });
      }
      toggleAdd=()=>{
        this.setState({
          modalAdd:!this.state.modalAdd
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
    <Row>
    <Col xs={{size:3}} className="title">Projects </Col>
    <Col xs={{size:2,offset:7}}>
    <Button className="btn-add" onClick={this.toggleAdd}>Add New Project</Button>
    <Modal className="showModal" isOpen={this.state.modalAdd}>
    <AddNewProject toggleSubmit={this.toggleAdd}/>
    </Modal>
    </Col>
    </Row>
    <Card className="cardForDashboard">
      <Row className="rowHead">
      <Col className="colHead" xs={{size:1}}>S.No.</Col>
      <Col className="colHead" xs={{size:2}}>Course Name</Col>
      <Col className="colHead" xs={{size:3}}>Project Name</Col>
      <Col className="colHead" xs={{size:2}}>Added by</Col>
      <Col className="colHead" xs={{size:2}}>Updated by</Col>
      <Col className="colHead" xs={{size:2}}>Status</Col>
      </Row>
       {this.props.data.project_data.map((value,key)=>
         <div key={key}>
         <Row className="rowBody" onClick={()=>{
                                  this.setState({
                                    modal:!(this.state.modal),
                                   projectKey:key})}}>
             <Col className="colBody" xs={{size:1}}>{key+1}</Col>
             <Col  className="colBody" xs={{size:2}}>{value.course_name}</Col>
             <Col  className="colBody" xs={{size:3}}>{value.project_name}</Col>
             <Col  className="colBody" xs={{size:2}}>{value.added_by}</Col>
             <Col  className="colBody" xs={{size:2}}>{value.updated_by}</Col>
             <Col  className="colBody" xs={{size:2}}>{value.status}</Col>
           </Row>
           <Modal className="showModal" isOpen={this.state.modal&&(this.state.projectKey===key)}>
          <ShowProjectDetails index={key} value={value} toggle={this.toggle}/ >
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
export default connect(mapStateToProps,{getProjectsRequest})(Projects)
